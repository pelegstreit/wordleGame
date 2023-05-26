import {useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newGame } from '../state/game.slice';
import './App.css';
import Menu from './menu';
function AfterGame() {
    const dispatch = useDispatch();

    const launchNewGame = () => {
        dispatch(newGame());
      };

    return (
        <>
        <Menu/>
      <button onClick={launchNewGame()}>Play Again?</button>
        </>
    )


}
export default AfterGame;
