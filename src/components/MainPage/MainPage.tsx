import { useState, useEffect, FC } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import SearchBar from '../SearchBar/SearchBar'
import classes from './MainPage.module.scss'
import { getData, isResponseOk, removeJWT } from '../../api/api-utils'
import { BASE_URL, NODE_URL } from '../../api/config'

// Swiper core and required modules
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import { ICocktail } from '../../models/cocktails.model'
import { useAppSelector } from '../../hooks/redux'

// install Swiper modules
SwiperCore.use([Navigation])

const MainPage: FC = () => {
  const { data } = useAppSelector(state => state?.user)
  const user = data?.user
  const [cocktails, setCocktails] = useState<ICocktail[]>([])

  const handleLogout = () => {
    removeJWT()
    window.location.reload()
  }

  const fetchCocktails = async () => {
    const response = await getData(`${BASE_URL}/search.php?f=a`)
    const drinksFromDataBase = await getData(`${NODE_URL}/drinks`)
    const resArray = response.data.drinks
      ? response.data.drinks.concat(drinksFromDataBase.data)
      : drinksFromDataBase.data
    return isResponseOk(response) ? setCocktails(resArray || []) : response
  }

  useEffect(() => {
    fetchCocktails()
  }, [])

  return (
    <>
      <div className={classes.navigation}>
        <div className={classes.navigation__top}>
          <h2>Popular Cocktails</h2>
          <SearchBar />
          <div>
            <button onClick={handleLogout} className={classes.button}>
              Log out
            </button>
            <p>
              {window.innerWidth > 500 ? 'username:' : ''} {user?.username}
            </p>
          </div>
        </div>
        <Swiper
          navigation={true}
          spaceBetween={30}
          slidesPerView={
            window.innerWidth > 700 ? 3 : window.innerWidth > 450 ? 2 : 1
          }
        >
          {cocktails.map(cocktail => (
            <SwiperSlide key={cocktail.idDrink}>
              <Link
                className={classes.navigation__item}
                to={`/cocktail/${cocktail.idDrink}`}
              >
                <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={classes.btnWrapper}>
          <Link className={classes.button} to={`/add`}>
            Add new Drink
          </Link>
        </div>
      </div>
    </>
  )
}

export default MainPage
