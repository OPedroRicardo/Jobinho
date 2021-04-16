if (Notification.permission !== 'denied') {
    // Pede ao usuário para utilizar a Notificação Desktop
    Notification.requestPermission()
}

const audio = new Audio("./sounds/start.mp3")

const hours = document.querySelector(".hours")
const minutes = document.querySelector(".minutes")
const seconds = document.querySelector(".seconds")

let timeData = {
  cicle: 1,
  hours: 0,
  minutes: 25,
  seconds: 0,
}

let time = 0
let currentTime = time // variável que vai ser diminuida pra fazer o countDown

// notification.js
function notification(){
  if (Notification.permission === 'granted') {
    new Notification ("Você concluiu um cíclo!", {
    header: "Parabéeeeens!!!",
    body: "Você concuiu um ciclo ^-^",
    icon: "../images/favicon.png",
  })
}
}

function changeSelected(toShow){
  document.querySelectorAll('.pomo-modes button h4').forEach(element => element.classList.remove('selected'))
  toShow.classList.add('selected')
}

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
      changeSelected(document.querySelector('.work'))
      //console.log(timeData.cicle)
      return
    }

    if(timeData.cicle != 8 && timeData.cicle % 2 == 0) {
      timeData.hours = 0
      timeData.minutes = 5
      timeData.seconds = 0
      clock.toSeconds()
      changeSelected(document.querySelector('.short-break'))
      //console.log(timeData.cicle)
      return
    }

    timeData.hours = 0
    timeData.minutes = 15
    timeData.seconds = 0
    clock.toSeconds()
    changeSelected(document.querySelector('.long-break'))
    //console.log(timeData.cicle)
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

      if (Notification.permission === 'granted') {
        new Notification ("Você concluiu um cíclo!", {
        header: "Parabéeeeens!!!",
        body: "Você concuiu um ciclo ^-^",
        icon: "../images/favicon.png",
      })
      }

      stop()
      timeData.cicle++
      clock.setTime()
      clock.display()
      audio.play()
      document.querySelector('.pause').classList.remove('visible', 'animate-right')
      document.querySelector('.start').classList.add('visible', 'animate-right')
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

const started = document.querySelector("#start .button-positive")
const stoped = document.querySelector("#pause .button-pause")
const resumed = document.querySelector("#reset .button-positive")
const resetedWork = document.querySelector("#work-reset")

started.addEventListener("click", clock.start)
resumed.addEventListener("click", clock.interval)
resetedWork.addEventListener("click", function () {
  clock.reset()
})