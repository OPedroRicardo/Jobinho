export default function Modal({ animateClasses = [] }) {

  const wrapper = document.querySelector('#modal-wrapper')
  const musicModal = document.querySelector('#music-modal')
  const element = document.querySelectorAll('.modal')
  const cancelButton = document.querySelectorAll(".cancel-button")
  const cancel = document.querySelectorAll('.modal a')

  cancelButton.forEach(element => {
      element.addEventListener('click', close)
  })

  cancel.forEach(element => {
      element.addEventListener('click', close)
  })

  function open() {
    document.addEventListener('keydown', closeOnEscape)
    wrapper.classList.add('on')
    element.forEach(element => {
      element.classList.add(...animateClasses)
    })
  }

  function openMusic() {
    document.addEventListener('keydown', closeOnEscape)
    musicModal.classList.add('on', ...animateClasses)
  }

  function close() {
    document.removeEventListener('keydown', closeOnEscape)
    wrapper.classList.remove('on')
    musicModal.classList.remove('on', ...animateClasses)
    element.forEach(element => {
      element.classList.remove(...animateClasses)
    })
  }

  function closeOnEscape({ key }) {
    if (key == 'Escape') {
      close()
    }
  }

  return  {
    open,
    openMusic,
    close
  }
}