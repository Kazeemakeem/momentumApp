const clock = document.querySelector('h2#clock')

function getClock(){
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,'0')
    const minutes = String(date.getMinutes()).padStart(2,'0')
    const seconds = String(date.getSeconds()).padStart(2,'0')
    const clockText = `${hours}:${minutes}:${seconds}`
    clock.textContent = clockText;
}

getClock() // for immediate rendering just before the time interval takes effect

setInterval(getClock, 1000);