import { createSlice } from "@reduxjs/toolkit";
import D2 from '../static/2D.svg'
import D3 from '../static/3D.svg'
import D4 from '../static/4D.svg'
import D5 from '../static/5D.svg'
import D6 from '../static/6D.svg'
import D7 from '../static/7D.svg'
import D8 from '../static/8D.svg'
import D10 from '../static/10D.svg'

interface InitialState{
  cardWins: string[];
  gameOver: boolean;
  openCard: string;
  openCardIndex: number | null;
  countOpenCard: number;
  card: string[];
}

const initialState: InitialState = {
  cardWins: [], // список найденых карт
  gameOver: false,
  openCard: '', // текущая открытая карта
  openCardIndex: null,
  countOpenCard: 0, // колличество открытых карт, не должно быть больше 2
  card: [D2, D3, D4, D5, D6, D7, D8, D10, D2, D3, D4, D5, D6, D7, D8, D10]
}

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    setOpenCard(state, action){
      state.openCard = action.payload
    },
    setOpenCardIndex(state, action){
      state.openCardIndex = action.payload
    },
    clearOpenCard(state){
      state.openCard = ''
    },
    clearOpenCardIndex(state){
      state.openCardIndex = null
    },
    incrementCountOpenCard(state){
      ++state.countOpenCard
    },
    clearCountOpenCard(state){
      state.countOpenCard = 0
    },
    addCardWins(state, action){
      state.cardWins.push(action.payload)
      if (state.cardWins.length === 8) { state.gameOver = true} 
    }
  }
})

export const { addCardWins, setOpenCard, clearOpenCard, 
  incrementCountOpenCard, clearCountOpenCard, setOpenCardIndex, clearOpenCardIndex } = cardSlice.actions
export default cardSlice.reducer