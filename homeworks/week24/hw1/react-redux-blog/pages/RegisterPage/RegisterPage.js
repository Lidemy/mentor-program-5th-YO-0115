import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  register,
  selectErrorMessage,
  clearErrorMessage,
} from '../../redux/reducers/userReducer'
import {
  FormContainer,
  FormTitleButton,
  FormInfo,
  FormInput,
  FormText,
  ErrorMessage,
} from '../../style/formStyle'

function LoginPage() {
  const [nickname, setNickname] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const errorMessage = useSelector(selectErrorMessage)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(register(history, nickname, username, password))
  }

  const handleNicknameInput = (e) => {
    setNickname(e.target.value)
  }

  const handleUsernameInput = (e) => {
    setUsername(e.target.value)
  }

  const handlePasswordInput = (e) => {
    setPassword(e.target.value)
  }

  const handleInputFocus = () => {
    dispatch(clearErrorMessage())
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitleButton>註冊</FormTitleButton>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <FormInfo>
        <FormText>nickname</FormText>
        <FormInput
          value={nickname}
          onChange={handleNicknameInput}
          onFocus={handleInputFocus}
        />
      </FormInfo>
      <FormInfo>
        <FormText>username</FormText>
        <FormInput
          value={username}
          onChange={handleUsernameInput}
          onFocus={handleInputFocus}
        />
      </FormInfo>
      <FormInfo>
        <FormText>password</FormText>
        <FormInput
          type="password"
          value={password}
          onChange={handlePasswordInput}
          onFocus={handleInputFocus}
        />
      </FormInfo>
    </FormContainer>
  )
}

export default LoginPage
