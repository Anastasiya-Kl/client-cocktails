import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import lodash from 'lodash'
import classes from './SearchBar.module.scss'
import { BASE_URL, NODE_URL } from '../../api/config'
import { getData, isResponseOk } from '../../api/api-utils'
import { ICocktail } from '../../models/cocktails.model'

const SearchBar = () => {
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<ICocktail[]>([])

  const searchBarRef = useRef<HTMLDivElement>(null)

  const DEBOUNCE_DELAY = 1000

  const handleSearch = useCallback(async (query: any) => {
    const response = await getData(`${BASE_URL}/search.php?s=${query}`)
    const drinksFromDataBase = await getData(`${NODE_URL}/drinks?name=${query}`)
    const resArray = response.data.drinks
      ? response.data.drinks.concat(drinksFromDataBase.data)
      : drinksFromDataBase.data
    return isResponseOk(response)
      ? setSearchResults(resArray || [])
      : setSearchResults([])
  }, [])

  const debounceRequest = useMemo(() => {
    return lodash.debounce((query: any) => {
      handleSearch(query)
    }, DEBOUNCE_DELAY)
  }, [handleSearch])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setOpenResult(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div className={classes.bar} ref={searchBarRef}>
      <input
        type='text'
        value={searchTerm}
        onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
          debounceRequest(e.target.value)
          setOpenResult(true)
          setSearchTerm(e.target.value)
        }}
        placeholder='Search cocktails...'
      />
      <button
        className={classes.button}
        onClick={() => {
          setOpenResult(true)
          debounceRequest(searchTerm)
        }}
      >
        Search
      </button>
      <div
        className={`${classes.results} ${openResult ? classes['show'] : classes['hidden']}`}
      >
        {searchResults.length > 0 ? (
          searchResults.map(cocktail => (
            <Link
              className={classes.result}
              key={cocktail.idDrink}
              to={`/cocktail/${cocktail.idDrink}`}
            >
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
              <p>{cocktail.strDrink}</p>
            </Link>
          ))
        ) : (
          <p>Can't find such cocktail</p>
        )}
      </div>
    </div>
  )
}

export default SearchBar
