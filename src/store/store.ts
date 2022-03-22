import { configureStore } from '@reduxjs/toolkit'
import cardSlice from '../app/cardSlice'

const store = configureStore({
  reducer: {
    card: cardSlice,
  },
})
export type RootState = ReturnType<typeof store.getState>
export default store
