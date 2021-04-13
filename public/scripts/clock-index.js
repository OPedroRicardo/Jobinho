const start = document.getElementById('start')
const pause = document.getElementById('pause')
const reset = document.getElementById('reset')
const modal = document.querySelector('.clock-modal')

const startButton = start.querySelector('.button-positive')
//const defineButton = start.querySelector('.button-define')
const pauseButton = pause.querySelector('.button-pause')
const resumeButton = reset.querySelector('.button-positive')
const resetButton = reset.querySelector('.button-reset')
const cancelButton = modal.querySelector('.button-cancel')

//esconde o elemento
function clicked(toHide, toShow){
    toHide.classList.remove('visible', 'animate-right')
    toShow.classList.add('visible', 'animate-right')
}

function toggleModal(){
    document.querySelector('.modal-background').classList.toggle('modal-on')
    document.querySelector('.modal-background').classList.toggle('animate-pop')
    document.querySelector('.modal-background').classList.toggle('back')
}

startButton.addEventListener('click', function(){
    clicked(start, pause)
})
//defineButton.addEventListener('click', toggleModal)
cancelButton.addEventListener('click', toggleModal)
pauseButton.addEventListener('click', function(){
    clicked(pause, reset)
})
resumeButton.addEventListener('click', function(){
    clicked(reset, pause)
})
resetButton.addEventListener('click', function(){
    clicked(reset, start)
})

const count = document.querySelectorAll('.disabled')

count.forEach(element => element.addEventListener('click', function() {
    alert('Em breve ^-^')
}));