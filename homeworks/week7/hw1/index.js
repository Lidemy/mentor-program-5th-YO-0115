document.querySelector('form').addEventListener('submit', (e) => {
  // 阻止表單送出
  e.preventDefault()

  let hasError = false
  const values = {}

  const elements = document.querySelectorAll('.form')

  for (const element of elements) {
    const radios = element.querySelectorAll('input[type=radio]')
    const input = element.querySelector('input[type=text]')

    let isValid = true
    if (input) {
      values[input.name] = input.value
      if (!input.value) {
        isValid = false
      }
    } else if (radios.length) {
      isValid = [...radios].some((radio) => radio.checked)
      if (isValid) {
        const r = element.querySelector('input[type=radio]:checked')
        values[r.name] = r.value
      }
    } else {
      continue
    }

    if (!isValid) {
      element.classList.remove('hide-error')
      hasError = true
    } else {
      element.classList.add('hide-error')
    }
  }

  if (!hasError) {
    try {
      alert(JSON.stringify(values))
    } catch (err) {
      console.log('error')
    }
  }
})
