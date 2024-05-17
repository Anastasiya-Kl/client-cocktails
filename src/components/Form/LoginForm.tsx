import React, { useState } from 'react'
import classes from './Form.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Snackbar from '../Snackbar/Snackbar'
import { userLogin } from '../../store/reducers/ActionCreators'
import { useAppDispatch } from '../../hooks/redux'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    await dispatch(userLogin({ email, password })).then(res => {
      if (res.meta.requestStatus === 'fulfilled') {
        setMessage('Login success')
        setShowSnackbar(true)
        setTimeout(() => {
          setShowSnackbar(false)
          navigate('/')
        }, 1300)
      } else {
        setMessage('Incorrect credentials. Please try again.')
        setShowSnackbar(true)
        setTimeout(() => {
          setShowSnackbar(false)
        }, 1300)
      }
    })
  }

  return (
    <div>
      <h2>Login</h2>
      <form className={classes.form} onSubmit={handleLogin}>
        <input
          className={classes.input}
          type='email'
          placeholder='Email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          className={classes.input}
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className={classes.button} type='submit'>
          Login
        </button>
      </form>
      <Link className={classes.button} to='/register'>
        Register
      </Link>
      {showSnackbar && <Snackbar message={message} />}
    </div>
  )
}

export default LoginForm
