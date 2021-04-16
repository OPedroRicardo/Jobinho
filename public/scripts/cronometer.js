const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

let timeData = {
  hours: 0,
  minutes: 0,
  seconds: 0,
}

let time = 0

const clock = {
  toSeconds() {
    time = timeData.hours * 3600 + timeData.minutes * 60 + timeData.seconds // tempo total em segundos
  },

  format() {
    timeData.hours = Math.floor(time / 3600)
    timeData.minutes = Math.floor((time - timeData.hours * 3600) / 60)
    timeData.seconds = Math.floor(time % 60)

    timeData.hours = ("0" + timeData.hours).slice(-2)
    timeData.minutes = ("0" + timeData.minutes).slice(-2)
    timeData.seconds = ("0" + timeData.seconds).slice(-2)
  },

  display() {
    clock.format()

    hours.innerHTML = timeData.hours
    minutes.innerHTML = timeData.minutes
    seconds.innerHTML = timeData.seconds
  },

  interval(){
    function countDown(){
      ++time
      clock.display()
      /* console.log(
        timeData.hours + ":" + timeData.minutes + ":" + timeData.seconds
      ) */
    }
    
    const countDownInterval = setInterval(countDown, 1000)

    function stop(){
      clearInterval(countDownInterval)
    }
    
    clock.display()
    document.querySelector('.pause').classList.remove('visible', 'animate-right')
    document.querySelector('.start').classList.add('visible', 'animate-right')
    
    toPause.addEventListener("click", stop)
  },

  start() {
    clock.interval()
  },

  reset() {
    time = 0
    clock.display()
  },
}

const toStart = document.querySelector(".start .button-positive")
const toPause = document.querySelector(".pause")
const toResume = document.querySelector(".reset .button-positive")

toStart.addEventListener("click", clock.start)
toResume.addEventListener("click", clock.interval)
