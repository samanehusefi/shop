import { BASE_URL, ASSETS } from '@/config';

export interface PostData {
    id: number;
    title: string;
    priority: number;
    post_type: string;
    url: string;
    alt: string;
    src: string;
    category_title: string;
    active: boolean;
}
type PostsResponse = {
    posts: PostData[];
};
/* ---------------- renderSkeleton ---------------- */

const renderSkeleton = (): string => {
    return Array.from({ length: 8 })
        .map(() => `
            <li class="post_card">
                <div class="post_skeleton">
                    <div class="skeleton_img"></div>
                    <div class="skeleton_title"></div>
                </div>
            </li>
        `)
        .join('');
};
/* ---------------- fetch posts ---------------- */
const fetchPosts = async (): Promise<PostData[]> => {
    const response = await fetch(`${BASE_URL}/data/PostsData/posts.json`);

    if (!response.ok) {
        throw new Error('Failed to fetch posts.json');
    }

    const data: PostsResponse = await response.json();
    const posts: PostData[] = data.posts ?? [];

    return posts
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 8);
};

/* ---------------- render posts ---------------- */
const renderPosts = (posts: PostData[]): string => {
    return posts
        .map((p) => `
            <li class="post_card">
                <a href="${p.url}">
                       <img
    src="${ASSETS.waitingImage}"
    class="image-placeholder flex inset-0  w-full h-32 px-2 py-2 object-contain rounded-lg animate-pulse"
    alt="Waiting for image"
/>
                    <img class="post-img"
                        src="${p.src}"
                        alt="${p.alt}"
                        loading="lazy"
                        fetchpriority="low"
                    />
                    <h3>${p.title}</h3>
                </a>
            </li>
        `)
        .join('');
};
/* ---------------- initPostImages ---------------- */
const initPostImages = (container: Element) => {
    const images =
        container.querySelectorAll<HTMLImageElement>('.post-img');

    images.forEach((img) => {
        const placeholder =
            img.parentElement?.querySelector('.image-placeholder') as HTMLImageElement | null;

        const showImage = () => {
            img.classList.remove('opacity-0');
            placeholder?.remove();
        };

        const src = img.dataset.src;
        if (src) img.src = src;

        if (img.complete && img.naturalWidth > 0) {
            showImage();
        } else {
            img.addEventListener('load', showImage, { once: true });

            img.addEventListener(
                'error',
                () => {
                    placeholder?.remove();
                    img.src = '/images/no-image.webp';
                    img.classList.remove('opacity-0');
                },
                { once: true }
            );
        }
    });
};
/* ---------------- load posts ---------------- */
export const loadPosts = async (): Promise<void> => {
    const container = document.querySelector('.posts-list');

    if (!container) {
        console.error('Container ".posts-list" not found');
        return;
    }

    // show skeleton first
    container.innerHTML = renderSkeleton();

    try {
        const posts = await fetchPosts();
        container.innerHTML = renderPosts(posts);
        initPostImages(container);
    } catch (error) {
        console.error('Failed to load posts:', error);
        container.innerHTML = 'Error loading posts.';
    }
};

export default { loadPosts };