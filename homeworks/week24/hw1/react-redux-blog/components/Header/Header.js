import React, { useState, useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { selectUser, logout } from '../../redux/reducers/userReducer'
import { setTheme } from '../../utils'
import { ReactComponent as ThemeIcon } from '../../images/theme-icon.svg'
import {
  HeaderWrapper,
  IconWrapper,
  Hamburger,
  Span,
  NavbarContainer,
  Brand,
  NavbarList,
  Nav,
  ProgressContainer,
  ProgressBar,
} from './HeaderStyle'

const lightStyle = {
  fontWeight: '600',
  borderBottom: '3px solid rgba(0, 0, 0, 0.5)',
}

const darkStyle = {
  fontWeight: '600',
  borderBottom: '3px solid #EAEAED',
}

function Header({ isUser, currentTheme, setCurrentTheme }) {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scroll, setScroll] = useState(0)

  const handleChangeTheme = () => {
    if (currentTheme === 'light') {
      setCurrentTheme('dark')
      setTheme('dark')
      return
    }

    setCurrentTheme('light')
    setTheme('light')
  }

  const handleLogout = () => {
    dispatch(logout())
    setIsMenuOpen(false)
  }

  const progressBarHandler = () => {
    const totalScroll = document.documentElement.scrollTop
    const windowHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
    const scroll = `${(totalScroll / windowHeight) * 100}%`

    if (scroll === 'NaN%') return setScroll(0)

    setScroll(scroll)
  }

  useEffect(() => {
    window.addEventListener('scroll', progressBarHandler)
    return () => window.removeEventListener('scroll', progressBarHandler)
  })

  const activeStyle = useMemo(() => {
    return currentTheme === 'light' ? lightStyle : darkStyle
  }, [currentTheme])

  return (
    <>
      <HeaderWrapper>
        <Brand to="/" onClick={() => setIsMenuOpen(false)}>
          Blog
        </Brand>
        <IconWrapper onClick={handleChangeTheme}>
          <ThemeIcon />
        </IconWrapper>
        <Hamburger
          $isMenuOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Span />
          <Span />
          <Span />
        </Hamburger>
        {isUser && (
          <NavbarContainer $isMenuOpen={isMenuOpen}>
            <NavbarList>
              <Nav
                to="/posts-list"
                activeStyle={activeStyle}
                onClick={() => setIsMenuOpen(false)}
              >
                文章列表
              </Nav>
              <Nav
                to="/about"
                activeStyle={activeStyle}
                onClick={() => setIsMenuOpen(false)}
              >
                關於我
              </Nav>
              {user && (
                <Nav
                  to="/new-post"
                  activeStyle={activeStyle}
                  onClick={() => setIsMenuOpen(false)}
                >
                  發布文章
                </Nav>
              )}
            </NavbarList>
            <NavbarList>
              {!user && (
                <>
                  <Nav
                    to="/register"
                    activeStyle={activeStyle}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    註冊
                  </Nav>
                  <Nav
                    to="/login"
                    activeStyle={activeStyle}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    登入
                  </Nav>
                </>
              )}
              {user && (
                <Nav to="/" onClick={handleLogout}>
                  登出
                </Nav>
              )}
            </NavbarList>
          </NavbarContainer>
        )}
      </HeaderWrapper>
      <ProgressContainer>
        <ProgressBar $scroll={scroll}></ProgressBar>
      </ProgressContainer>
    </>
  )
}

Header.propTypes = {
  isUser: PropTypes.bool,
  currentTheme: PropTypes.string,
  setCurrentTheme: PropTypes.func,
}

export default Header
