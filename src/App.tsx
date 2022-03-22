import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CardList from './app/CardList';
import { RootState } from './store/store';

const refreshPage = () => { window.location.reload() }

function App() {
  let gameOver = useSelector((state:RootState) => state.card.gameOver)
  let title = gameOver ? "Поздравляем!!!!!" : "Вам нужно найти пары одинаковых карт"
  return (
    <div className='container'>
      <h3 id="title">
        { title }
        { gameOver ? <button onClick={refreshPage}>Еще раз</button> : null }
      </h3> 
      
      <CardList/>
    </div>
  );
}

export default App;
