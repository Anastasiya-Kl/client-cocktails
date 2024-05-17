import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getData, isResponseOk } from '../../api/api-utils'
import { BASE_URL, NODE_URL } from '../../api/config'
import classes from './RecipeDisplay.module.scss'
import { ICocktail } from '../../models/cocktails.model'
import { createIngredientsArray } from '../../utils/createIngredientsArray'

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [cocktail, setCocktail] = useState<ICocktail | null>(null)

  const fetchCocktail = async () => {
    const response = await getData(`${BASE_URL}/lookup.php?i=${id}`)
    const getDrinkFromDataBase = await getData(`${NODE_URL}/drinks/${id}`)

    if (response.status === 200 && response.data.drinks !== null) {
      const cocktail = createIngredientsArray(response.data.drinks[0])
      return isResponseOk(response) ? setCocktail(cocktail) : response
    } else {
      return isResponseOk(getDrinkFromDataBase)
        ? setCocktail(getDrinkFromDataBase.data)
        : response
    }
  }

  useEffect(() => {
    fetchCocktail()
  }, [id])

  return (
    <>
      {cocktail ? (
        <div className={classes.display}>
          <h2> {cocktail.strDrink}</h2>
          <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>{cocktail.strInstructions}</p>
          <h3>Ingredients:</h3>
          <ul className={classes.list}>
            {cocktail.ingredients?.map(ingredient => {
              if (ingredient === null) {
                return null
              }
              return <li key={ingredient}>{ingredient.trim()}</li>
            })}
          </ul>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  )
}

export default CocktailDetails
