import './styles/style.scss'
import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CocktailDetails from './components/RecipeDisplay/RecipeDisplay'
import NewCocktailForm from './components/NewCocktailForm/NewCocktailForm'
import LoginForm from './components/Form/LoginForm'
import MainPage from './components/MainPage/MainPage'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { userAuth } from './store/reducers/ActionCreators'
import RegistrationForm from './components/Form/RegistrationForm'
import { getJWT } from './api/api-utils'
import { BeatLoader } from 'react-spinners'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { data, isLoading, error } = useAppSelector(state => state.user)
  const token = getJWT()

  useEffect(() => {
    setTimeout(() => {
      dispatch(userAuth({ token }))
    }, 1300)
  }, [token, dispatch])

  return (
    <Router>
      <div className='montserrat container'>
        <Routes>
          {isLoading && (
            <Route path='/' element={<BeatLoader color='#36d7b7' />} />
          )}
          {error && <Route path='/' element={<h1>{error}</h1>} />}
          {data?.user?.username ? (
            <>
              <Route path='/' element={<MainPage />} />
              <Route path='/cocktail/:id' element={<CocktailDetails />} />
              <Route path='/add' element={<NewCocktailForm />} />
            </>
          ) : (
            <>
              <Route path='/' element={<LoginForm />} />
              <Route path='/register' element={<RegistrationForm />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App
