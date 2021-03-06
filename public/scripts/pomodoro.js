if( Notification.permission !== 'denied'){
  await Notification.requestPermission()
}

const start = new Audio("./sounds/start.mp3")

const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

let timeData = {
  cicle: 1,
  workCicle: 0,
  hours: 0,
  minutes: 25,
  seconds: 0,
}

let time = 0
let currentTime = time // variável que vai ser diminuida pra fazer o countDown

const alert = () =>
  new Notification("Você concluiu um cíclo!", {
    header: "Parabéeeeens!!!",
    body: "Você concuiu um ciclo ^-^",
    icon: "../images/favicon.png",
  })

const clock = {
  toSeconds() {
    time = timeData.hours * 3600 + timeData.minutes * 60 + timeData.seconds // tempo total em segundos
    currentTime = time
  },

  setTime() {
    if(timeData.cicle != 8 && timeData.cicle % 2 == 1) {
      timeData.hours = 0
      timeData.minutes = 25
      timeData.seconds = 0
      clock.toSeconds()
      document.querySelector('#work').classList.add('selected')
      document.querySelector('#short-break').classList.remove('selected')
      document.querySelector('#long-break').classList.remove('selected')
      return
    }

    if(timeData.cicle != 8 && timeData.cicle % 2 == 0) {
      timeData.hours = 0
      timeData.minutes = 5
      timeData.seconds = 0
      clock.toSeconds()
      document.querySelector('#work').classList.remove('selected')
      document.querySelector('#short-break').classList.add('selected')
      document.querySelector('#long-break').classList.remove('selected')
      return
    }

    timeData.hours = 0
    timeData.minutes = 15
    timeData.seconds = 0
    clock.toSeconds()
    document.querySelector('#work').classList.remove('selected')
    document.querySelector('#short-break').classList.remove('selected')
    document.querySelector('#long-break').classList.add('selected')
  },

  format() {
    timeData.hours = Math.floor(currentTime / 3600)
    timeData.minutes = Math.floor((currentTime - timeData.hours * 3600) / 60)
    timeData.seconds = Math.floor(currentTime % 60)

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
    clock.setTime()
    function countDown(){
      --currentTime
      clock.display()
      /* console.log(
        timeData.hours + ":" + timeData.minutes + ":" + timeData.seconds
      ) */
      if(currentTime <= 0) {
      changeCicle()
      }
    }
    
    const countDownInterval = setInterval(countDown, 1000)

    function stop(){
      clearInterval(countDownInterval)
    }

    function changeCicle(){
      if(timeData.cicle == 8){
        timeData.cicle = 0
      }
      stop()
      timeData.cicle++
      clock.setTime()
      clock.display()
      alert()
      start.play()
      document.getElementById('pause').classList.remove('visible', 'animate-right')
      document.getElementById('start').classList.add('visible', 'animate-right')
    }
    
    stopButton.addEventListener("click", stop)
  },

  start() {
    clock.interval()
  },

  reset() {
    timeData.cicle = 1
    clock.setTime()
    clock.display()
  },
}

const startButton = document.querySelector("#start .button-positive")
const stopButton = document.querySelector("#pause")
const resumeButton = document.querySelector("#reset .button-positive")
const resetWorkButton = document.querySelector("#work-reset")

startButton.addEventListener("click", clock.start)
resumeButton.addEventListener("click", clock.interval)
resetWorkButton.addEventListener("click", function () {
  clock.reset()
})
