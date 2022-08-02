const refs = {
    btnStart: document.querySelector('button[data-action-start]'),
    btnStop: document.querySelector('button[data-action-stop]'),
    clockFace: document.querySelector('.js-clockface'),
};

class Timer {
    constructor({onTick}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;

        this.init()
    }

    init() {
        const time = this.getTimeComponents(0);
        this.onTick(time)
    }

    start() {
        if (this.isActive) {
            return;
        }

        const startTime = Date.now();
        this.isActive = true;
        this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = currentTime - startTime;
        const time = this.getTimeComponents(deltaTime);
        this.onTick(time)
        }, 1000)
    }

    stop() {
        clearInterval(this.intervalId)
        this.isActive = false;
        const time = this.getTimeComponents(0);
        this.onTick(time)
    }

    // Принимает время в миллисекундах
    // Высчитывает сколько в них вмещаеться часов/минут/секунд
    // Возвращает объект со свойствами hours, mins, secs

    getTimeComponents(time) {
        const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
        const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
        return { hours, mins, secs };
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

const timer = new Timer({
    onTick: updateClockFace
});

refs.btnStart.addEventListener('click', timer.start.bind(timer));
refs.btnStop.addEventListener('click', timer.stop.bind(timer));

function updateClockFace ({ hours, mins, secs }) {
    refs.clockFace.textContent = `${hours}:${mins}:${secs}`;
};


// Таймер обратного отсчета

const refs2 = {
    wrapper: document.querySelector('.countdownTimer'),
    days: document.querySelector('.days'),
    hours: document.querySelector('.hours'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds'),
};

const deadLine = new Date(2023, 0, 1);

function countdownTimer() {
    const toDay = new Date();
    const deltaDate = deadLine - toDay;

    const seconds = String(Math.floor((deltaDate / 1000) % 60)).padStart(2, '0');
    const minutes = String(Math.floor((deltaDate / 1000 / 60) % 60)).padStart(2, '0');
    const hours = String(Math.floor((deltaDate / 1000 / 60 / 60) % 24)).padStart(2, '0'); 
    const days = String(Math.floor(deltaDate / 1000 / 60 / 60/ 24)).padStart(2, '0');  

    updateDate(days, hours, minutes, seconds);
}

setInterval(countdownTimer, 1000);

function updateDate(d, h, m, s) {
    refs2.days.textContent = `${d}:`;
    refs2.hours.textContent = `${h}:`;
    refs2.minutes.textContent = `${m}:`;
    refs2.seconds.textContent = s;
};


 


