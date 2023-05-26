import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Button';
import {useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from './menu';
import {loadGame,victory,createPopup,UpdateUserGuess, zeroUserGuess,newGame, raiseLetter,lowerLetter,checkIfWordExist, newGuess} from "../state/game.slice";


function App() {
  const dispatch = useDispatch();
  const word = useSelector((state)=> state.game.word);
  const currentGuess = useSelector((state)=> state.game.currentGuess);
  const currentLetter = useSelector((state)=> state.game.currentLetter);
  const wordExist=  useSelector((state)=> state.game.wordExist);
  const userGuess =  useSelector((state)=> state.game.userGuess);
  const currentGuessedWords= useSelector((state)=> state.game.currentGuessedWords);
  

  const keyboardLayout = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter','Z', 'X', 'C', 'V', 'B', 'N', 'M', '<--']
  ];

 
  const handleClick = (letter) => {
    switch(letter){
    case `Enter`:
      checkAGuess();
      break;
      case `Delete`:
        deleteAletter(letter);
        break;
        default:
          enterAletter(letter);
    }
  };
 
  const mistake = (typeOfMistake) => {
     //add animation
  }


  const checkAGuess = async () => {
    console.log(`checkAGuess started, you guessed ${userGuess}`);
    if(userGuess.length !== 5){
      // alert("the word is 5 letters");
      let current_box = `guess${currentGuess}`;
      let myRow = document.getElementById(current_box);
      myRow.classList.add("wobble-animation");
      setTimeout(function() {
        myRow.classList.remove("wobble-animation");
      }, 3000);
      createPopup("the word is 5 letters");
    }
    else{
      if(userGuess === word)
      {
        victory(word,userGuess,currentGuess);
      }
      else{
        dispatch(checkIfWordExist(word, userGuess, currentGuess));
      }
    }
  };
  const deleteAletter = (letter) => {
    if(currentLetter-1 !== 0)
    {
    let current_box = `letter${currentGuess}-${currentLetter-1}`;
    // console.log(`deleteAletter started, you want to delete: letter${currentGuess}-${currentLetter-1}`);
    // console.log("current box:",current_box);
    let myDiv = document.getElementById(current_box);
    // console.log("ny div- ", myDiv);
    myDiv.innerHTML = null;
    // console.log("userguess before:", userGuess.current);
    dispatch(UpdateUserGuess( userGuess.substring(0, userGuess.length - 1)));
    // console.log("userguess after:", userGuess.current);
    dispatch(lowerLetter());
    }
    else{
      // alert("you dont have a letter to delete!");
      createPopup("you dont have a letter to delete!");
    }
  };
  const enterAletter =(letter) => {
    // console.log(`You clicked letter ${letter}`);
    let current_box = `letter${currentGuess}-${currentLetter}`;
    // console.log("currentbox:",current_box);
    let myDiv = document.getElementById(current_box);
    // console.log("mydiv:",myDiv);
    if(currentLetter === 6){
      // alert(`the word is 5 letters word`);
      createPopup(`the word is 5 letters word`);

    }
    else{
    myDiv.innerHTML = letter;
    dispatch(UpdateUserGuess(userGuess + letter.toLowerCase()));
      dispatch(raiseLetter());
      // console.log("current guess:", userGuess.current);
    }
  };




  useEffect(() => {
    // dispatch(newGame());
    loadGame(word, currentGuessedWords);
    }, []);

  return (
    <div className='page'>
    <Menu/>
    {/* guess */}

        <div className='row' id="guess1">
        <div className="square" id='letter1-1'></div>
        <div className="square" id='letter1-2'></div>
        <div className="square" id='letter1-3'></div>
        <div className="square" id='letter1-4'></div>
        <div className="square" id='letter1-5'></div>
        </div>
        <div className='row' id="guess2">
        <div className="square" id='letter2-1'></div>
        <div className="square" id='letter2-2'></div>
        <div className="square" id='letter2-3'></div>
        <div className="square" id='letter2-4'></div>
        <div className="square" id='letter2-5'></div>
        </div>
        <div className='row' id="guess3">
        <div className="square" id='letter3-1'></div>
        <div className="square" id='letter3-2'></div>
        <div className="square" id='letter3-3'></div>
        <div className="square" id='letter3-4'></div>
        <div className="square" id='letter3-5'></div>
        </div>
        <div className='row' id="guess4">
        <div className="square" id='letter4-1'></div>
        <div className="square" id='letter4-2'></div>
        <div className="square" id='letter4-3'></div>
        <div className="square" id='letter4-4'></div>
        <div className="square" id='letter4-5'></div>
        </div>
        <div className='row' id="guess5">
        <div className="square" id='letter5-1'></div>
        <div className="square" id='letter5-2'></div>
        <div className="square" id='letter5-3'></div>
        <div className="square" id='letter5-4'></div>
        <div className="square" id='letter5-5'></div>
        </div>
        <div className='row' id="guess6">
        <div className="square" id='letter6-1'></div>
        <div className="square" id='letter6-2'></div>
        <div className="square" id='letter6-3'></div>
        <div className="square" id='letter6-4'></div>
        <div className="square" id='letter6-5'></div>
        </div>





    {/* ketboard */}
       
      {/* {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex}>
          {row.map((letter, letterIndex) => (
            <Button id={letter} type='button' variant="secondary" className="text-light btn-lg m-1" key={letterIndex} onClick={() => handleClick(letter)}>{letter}</Button>
          ))}
        </div>
      ))} */}

<div id="keyboard">
  <div class="row1">
    <button id="Q" onClick={() =>handleClick('Q')}>Q</button>
    <button id="W" onClick={() =>handleClick('W')}>W</button>
    <button id="E" onClick={() =>handleClick('E')}>E</button>
    <button id="R" onClick={() =>handleClick('R')}>R</button>
    <button id="T" onClick={() =>handleClick('T')}>T</button>
    <button id="Y" onClick={() =>handleClick('Y')}>Y</button>
    <button id="U" onClick={() =>handleClick('U')}>U</button>
    <button id="I" onClick={() =>handleClick('I')}>I</button>
    <button id="O" onClick={() =>handleClick('O')}>O</button>
    <button id="P" onClick={() =>handleClick('P')}>P</button>
  </div>
  <div class="row2">
    <button id="A" onClick={() =>handleClick('A')}>A</button>
    <button id="S" onClick={() =>handleClick('S')}>S</button>
    <button id="D" onClick={() =>handleClick('D')}>D</button>
    <button id="F" onClick={() =>handleClick('F')}>F</button>
    <button id="G" onClick={() =>handleClick('G')}>G</button>
    <button id="H" onClick={() =>handleClick('H')}>H</button>
    <button id="J" onClick={() =>handleClick('J')}>J</button>
    <button id="K" onClick={() =>handleClick('K')}>K</button>
    <button id="L" onClick={() =>handleClick('L')}>L</button>
  </div>
  <div class="row2">
    <button id="Enter" onClick={() =>handleClick('Enter')}>Enter</button>
    <button id="Z" onClick={() =>handleClick('Z')}>Z</button>
    <button id="X" onClick={() =>handleClick('X')}>X</button>
    <button id="C" onClick={() =>handleClick('C')}>C</button>
    <button id="V" onClick={() =>handleClick('V')}>V</button>
    <button id="B" onClick={() =>handleClick('B')}>B</button>
    <button id="N" onClick={() =>handleClick('N')}>N</button>
    <button id="Delete" onClick={() =>handleClick('Delete')}>Delete</button>
  </div>
</div>

    </div>
  )
}

export default App;

