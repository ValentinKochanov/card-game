import React, { FC, useMemo } from 'react'
import { useSelector } from 'react-redux';
import CardItem from './CardItem'
import { RootState } from '../store/store';

function shuffle(arr: string[]){
  // Перемешивает массив.
  // При каждой игре новая раскладка карт
  let j:number
  for(let i:number = arr.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

const CardList:FC = () => {
  let img = useSelector((state: RootState) => state.card.card)
  let copyImg = img.slice(0)

  copyImg = useMemo(() => shuffle(copyImg), [img]);
  // shuffle(copyImg)  
  
  return (
    <div className="App">
      {copyImg.map((el, index) => 
      <CardItem 
        img={el}
        index={index} 
        key={el + index}
        />)}
    </div>
  )
}

export default CardList