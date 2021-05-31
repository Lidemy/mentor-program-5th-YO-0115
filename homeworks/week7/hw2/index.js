document.querySelector('.section__qnas').addEventListener('click', (e) => {
  const element = e.target.closest('.qna')
  if (element) {
    element.classList.toggle('qna__answer-hidden')
  }
})
