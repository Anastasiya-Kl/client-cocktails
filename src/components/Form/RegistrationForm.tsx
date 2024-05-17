import { useState } from 'react'
import classes from './Form.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import Snackbar from '../Snackbar/Snackbar'
import { useAppDispatch } from '../../hooks/redux'
import { userRegistration } from '../../store/reducers/ActionCreators'

const RegistrationForm = () => {
  const dispatch = useAppDispatch()
  let navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false)

  const handleRegistration = async (e: React.ChangeEvent<any>) => {
    e.preventDefault()
    await dispatch(userRegistration({ username, email, password })).then(
      res => {
        if (res.meta.requestStatus === 'fulfilled') {
          setMessage('Registration success')
          setShowSnackbar(true)
          setTimeout(() => {
            setShowSnackbar(false)
            navigate('/')
          }, 1300)
        } else {
          setMessage('Error during registration. Please try again.')
          setShowSnackbar(true)
          setTimeout(() => {
            setShowSnackbar(false)
          }, 1300)
        }
      },
    )
  }

  return (
    <div>
      <h2>Register</h2>
      <form className={classes.form} onSubmit={handleRegistration}>
        <input
          className={classes.input}
          type='text'
          placeholder='Username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
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
          Register
        </button>
      </form>
      <Link className={classes.button} to='/'>
        Login
      </Link>

      {showSnackbar && <Snackbar message={message} />}
    </div>
  )
}

export default RegistrationForm
