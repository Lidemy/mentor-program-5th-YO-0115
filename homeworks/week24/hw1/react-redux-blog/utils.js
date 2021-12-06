const TOKEN_NAME = 'token'
const THEME_NAME = 'theme'

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token)
}

export const getAuthToken = () => {
  localStorage.getItem(TOKEN_NAME)
}

export const setTheme = (theme) => {
  localStorage.setItem(THEME_NAME, theme)
}

export const getTheme = () => {
  localStorage.getItem(THEME_NAME) || 'light'
}
