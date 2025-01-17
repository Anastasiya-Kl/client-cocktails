import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userAuthReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
  user: userAuthReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
