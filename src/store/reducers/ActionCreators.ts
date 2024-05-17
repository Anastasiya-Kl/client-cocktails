import axios from 'axios'
import { setJWT } from '../../api/api-utils'
import { NODE_URL } from '../../api/config'
import { IUser } from '../../models/user.model'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const userAuth = createAsyncThunk(
  'user/authorization',
  async (data: { token: string }, thunkAPI) => {
    const { token } = data
    if (token) {
      try {
        const response = await axios.get<IUser>(`${NODE_URL}/auth/validation`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response.data
      } catch (e) {
        return thunkAPI.rejectWithValue('Error checking authentication')
      }
    }
  },
)

export const userLogin = createAsyncThunk(
  'user/login',
  async (user: { email: string; password: string }, thunkAPI) => {
    const { email, password } = user
    try {
      const response = await axios.post(`${NODE_URL}/auth/login`, {
        email,
        password,
      })
      setJWT(response.data.token)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue('Error during login. Please try again.')
    }
  },
)

export const userRegistration = createAsyncThunk(
  'user/registration',
  async (
    user: { username: string; email: string; password: string },
    thunkAPI,
  ) => {
    const { username, email, password } = user
    try {
      const response = await axios.post(`${NODE_URL}/auth/register`, {
        username,
        email,
        password,
      })
      setJWT(response.data.token)
      return response.data
    } catch (e) {
      return thunkAPI.rejectWithValue(
        'Error during registration. Please try again.',
      )
    }
  },
)
