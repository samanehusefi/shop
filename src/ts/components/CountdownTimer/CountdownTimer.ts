export function startAmazingTimer(targetDateString: string): void {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (!hoursEl || !minutesEl || !secondsEl) {
        console.warn('Timer elements not found');
        return;
    }

    const targetDate = new Date(targetDateString).getTime();

    if (isNaN(targetDate)) {
        console.error('Invalid date');
        return;
    }

    const update = () => {
        const diff = targetDate - Date.now();

        if (diff <= 0) {
            clearInterval(interval);

            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }

        const totalHours = Math.floor(
            diff / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (diff % (1000 * 60 * 60)) /
            (1000 * 60)
        );

        const seconds = Math.floor(
            (diff % (1000 * 60)) / 1000
        );

        hoursEl.textContent = String(totalHours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    };

    update();

    const interval = window.setInterval(
        update,
        1000
    );
}

export default startAmazingTimer;