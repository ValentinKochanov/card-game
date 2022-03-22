import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AC from '../static/AC.svg'
import { RootState } from '../store/store'
import { setOpenCard, addCardWins, clearOpenCard, incrementCountOpenCard, clearCountOpenCard, 
  setOpenCardIndex, clearOpenCardIndex } from './cardSlice'

interface CardItemProps{
  img: string,
  index: number
}

const CardItem = ({img, index}: CardItemProps) => {
  let [ac, setAc] = useState(true) // Показываем туз или другую карту
  let [stopCard, setStopCard] = useState(false) // Отключает onClick если найдены одинаковые карты
  let cardWins = useSelector((state:RootState) => state.card.cardWins)
  let openCard = useSelector((state: RootState) => state.card.openCard)
  let openCardIndex = useSelector((state: RootState) => state.card.openCardIndex)
  let countOpenCard = useSelector((state: RootState) => state.card.countOpenCard)
  let dispatch = useDispatch()

  const handleACClick = (img:string) => {
    // Обработка клика по карте
    if (countOpenCard === 2) return;
    setAc(!ac);
    dispatch(incrementCountOpenCard())
    switch(openCard) {
      case "":
        // Если нет открытых карт
        dispatch(setOpenCard(img));
        dispatch(setOpenCardIndex(index));
        break;
      case img:
        // Если вторая открытая карта совпадает с первой оставляем их открытыми
        if (openCardIndex !== index) {
          // проверяем что это не клик на ту же самую карту
          dispatch(addCardWins(img));
          dispatch(clearCountOpenCard())
          dispatch(clearOpenCard())
        } else {
          // если это клик на ту же самую карту ничего не делаем
          dispatch(clearCountOpenCard())
          dispatch(clearOpenCard())
        }
        break;
      default:
        // Если вторая открытая карта не совпадает с первой закрываем их 
        dispatch(setOpenCard(img));
        setTimeout(() => {
          closeCard();
          dispatch(clearOpenCard());
        }, 1500);
    }
  }

  const closeCard = () => {
    setAc(true)
    dispatch(clearCountOpenCard())
    dispatch(clearOpenCardIndex())
  }

  let card = ac ? AC : img 
  if (stopCard) { card = img }
  
  useEffect(() => {
    // Закрывает карты если открыты 2 разные карты
    if (card === img && openCard && img !== openCard && !stopCard) {
      setTimeout(() => {
        closeCard();
      }, 1500);
    }
  });

  useEffect(() => {
    // Не закрывает первую карту при совпадении карт
    if (cardWins.includes(img)) {
      setStopCard(true)
    } else if (openCard && openCard !== img) {
      setTimeout(() => {
        closeCard();
      }, 1500);
    }
  }, [cardWins, img]);
  
  return (
    <div className={"item"}>
      <img src={card} alt={img} onClick={stopCard ? undefined : () => handleACClick(img)}/>
    </div>
  )
}

export default CardItem