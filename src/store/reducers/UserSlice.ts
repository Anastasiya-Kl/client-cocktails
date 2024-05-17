import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../models/user.model'
import { userAuth, userLogin, userRegistration } from './ActionCreators'

interface UserState {
  data: IUser | null
  isLoading: boolean
  error: string
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(userAuth.pending, (state: UserState) => {
        state.isLoading = true
      })
      .addCase(
        userAuth.fulfilled,
        (state: UserState, action: PayloadAction<IUser>) => {
          state.isLoading = false
          state.error = ''
          state.data = action.payload
        },
      )
      .addCase(
        userAuth.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
      .addCase(userLogin.pending, (state: UserState) => {
        state.isLoading = true
      })
      .addCase(
        userLogin.fulfilled,
        (state: UserState, action: PayloadAction<IUser>) => {
          state.isLoading = false
          state.error = ''
          state.data = action.payload
        },
      )
      .addCase(
        userLogin.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
      .addCase(userRegistration.pending, (state: UserState) => {
        state.isLoading = true
      })
      .addCase(
        userRegistration.fulfilled,
        (state: UserState, action: PayloadAction<IUser>) => {
          state.isLoading = false
          state.error = ''
          state.data = action.payload
        },
      )
      .addCase(
        userRegistration.rejected,
        (state: UserState, action: PayloadAction<any>) => {
          state.isLoading = false
          state.error = action.payload
        },
      )
  },
})

export default userSlice.reducer
