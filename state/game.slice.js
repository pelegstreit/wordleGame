import { createSlice } from "@reduxjs/toolkit";

const game = createSlice({
  name: "game",
  initialState: {
    word: '',
    userGuess: '',
    currentGuess: 1,
    currentLetter: 1,
    wordExist: true,
    usedWords: [],
    currentGuessedWords: [],
    userScore: {'1':0, '2':0, '3':0,'4':0,'5':0,'6':0},
    isLoading: false,
    errorMessage: '',
  },
  reducers: {
    fetchWordStarted: (state) => {
      state.isLoading = true;
    },
    fetchWordFailed: (state, action) => {
      state.errorMessage = action.payload;
    },
    fetchWordReady(state, action) {
      state.word = action.payload;
      state.currentGuess = 1;
      state.currentLetter = 1;
      state.userGuess = '';
      state.currentGuessedWords= [];
      state.isLoading = false;
      state.errorMessage = "";
    },
    resetGuess(state, action) {
      state.currentGuess = 1;
    },
    resetWord(state, action) {
      state.currentLetter = 1;
    },

    raiseLetter(state, action) {
      state.currentLetter = state.currentLetter + 1;
    },
    lowerLetter(state, action) {
      state.currentLetter = state.currentLetter - 1;
    },
    newGuess(state, action) {
      state.currentGuess = state.currentGuess + 1;
      console.log(state.currentGuess);
      state.currentLetter = 1;
      state.userGuess = '';
    },
    wordIndict(state, action) {
      state.wordExist = action.payload;
    },
    zeroUserGuess(state, action) {
      state.userGuess = '';
    },
    UpdateUserGuess(state, action) {
      state.userGuess = action.payload;
    },
    UpdateUsedwords(state, action) {
      state.usedWords.push(action.payload);
    },
    UpdateCurrentGuessedWords(state, action) {
      state.currentGuessedWords.push(action.payload);
    },
    UpdateUserScore(state, action) {
      state.userScore[action.payload] =  state.userScore[action.payload] +1;
    },





  }
})
export default game.reducer;
export const {UpdateUserScore,UpdateCurrentGuessedWords,UpdateUsedwords, UpdateUserGuess, wordIndict, zeroUserGuess, fetchWordStarted, fetchWordFailed, fetchWordReady, resetGuess, resetWord, raiseLetter, lowerLetter, newGuess
} = game.actions;

export const newGame = () => async (dispatch) => {
  // export const newGame = (usedWords) => async (dispatch) => {
  try {
    dispatch(fetchWordStarted());
    let exist = true;
    // while(exist){
    //   let endpoint = `https://random-word-api.herokuapp.com/word?length=5`;
    //   const response = await (await fetch(endpoint)).json();
    //   console.log(response.join());
    //   if(usedWords.includes(response.join()) === false){
    //     exist= false;
    //   }
    // }
    let endpoint = `https://random-word-api.herokuapp.com/word?length=5`;
    const response = await (await fetch(endpoint)).json();
    console.log(response.join());
    
    dispatch(fetchWordReady(response.join()));
    dispatch(UpdateUsedwords(response.join()));
  } catch (err) {
    dispatch(fetchWordFailed(err.errorMessage));
  }
}
export const loadGame = (word, currentGuessedWords) =>{
  console.log(currentGuessedWords);
  for(let i=0; i<currentGuessedWords.length; i++)
  {
    //insetr to any row the bleonged guess
    for(let j=0; j<5; j++){
      //inster to any guess the letters
      let myDiv = document.getElementById(`letter${i+1}-${j+1}`);
      myDiv.innerHTML = currentGuessedWords[i][j] ;
    }
    Coloring(word,currentGuessedWords[i],i+1);
    // console.log("word- ",word,"current guess-" ,currentGuessedWords[i],"current index of guess", i);

  }
}
export const Coloring = (word, userGuess, currentGuess) => {
  console.log("start coloring:", word, userGuess, currentGuess);
  for (let i = 0; i < 5; i++) {
    if (word.includes(userGuess[i])) {
      let current_box = `letter${currentGuess}-${i + 1}`;
      console.log("currentbox:",current_box);
      let myDiv = document.getElementById(current_box);
      console.log(myDiv);
      myDiv.style.backgroundColor = 'yellow';
      // console.log("letter", userGuess.current[i]);
      let keyboardDiv = document.getElementById(userGuess[i].toUpperCase());
      if (keyboardDiv.style.backgroundColor !== 'green') {
        keyboardDiv.style.backgroundColor = 'yellow';
      }
    }
    else {
      let keyboardDiv = document.getElementById(userGuess[i].toUpperCase());
      keyboardDiv.style.backgroundColor = 'grey';
    }
  }
  for (let y = 0; y < 5; y++) {
    // console.log(word);
    // console.log(userGuess.current[y] , word[y]);
    if (userGuess[y] === word[y]) {
      let current_box = `letter${currentGuess}-${y + 1}`;
      // console.log("currentbox:",current_box);
      let myDiv = document.getElementById(current_box);
      myDiv.style.backgroundColor = 'green';
      let keyboardDiv = document.getElementById(word[y].toUpperCase());
      // console.log(keyboardDiv);
      keyboardDiv.style.backgroundColor = 'green';
    }
  }
  for (let j = 0; j < 5; j++) {
    let current_box = `letter${currentGuess}-${j + 1}`;
    let myrow = document.getElementById(`guess${currentGuess}`);
    let myDiv = document.getElementById(current_box);
    myrow.classList.add("wobble-animation");
    if (myDiv.style.backgroundColor !== 'green' && myDiv.style.backgroundColor !== 'yellow') {
      myDiv.style.backgroundColor = 'grey';
    }
  }
}

export const endOfGame = () => {


}


export const createPopup = (message) => {
  const popup = document.createElement('div');
  popup.className = 'popup';
  popup.textContent = message;

  // Apply styles to the popup
  popup.style.position = 'fixed';
  popup.style.top = '10%';
  popup.style.left = '50%';
  popup.style.transform = 'translate(-50%, -50%)';
  popup.style.padding = '10px 20px';
  popup.style.backgroundColor = 'black';
  popup.style.color = 'white';
  popup.style.borderRadius = '5px';
  popup.style.zIndex = '9999';

  document.body.appendChild(popup);

  // Remove the popup after 2 seconds
  setTimeout(function () {
    popup.remove();
  }, 2000);
}
export const checkIfWordExist = (word, userGuess, currentGuess) => async (dispatch) => {
  try {
    console.log(`checkIfWordExist started, you guessed ${userGuess}`);
    let endpoint = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const response = await (await fetch(endpoint)).json();
    const Isexsist = response.title ? false : true;

    // dispatch(wordIndict(Isexsist)).then(console.log("wordExist:"));
    let current_box = `guess${currentGuess}`;
    let myRow = document.getElementById(current_box);
    if (Isexsist) {
      Coloring(word, userGuess, currentGuess);
      dispatch(UpdateCurrentGuessedWords(userGuess));
      if (currentGuess === 6) {
        // alert("game over!");
        console.log(myRow);
        createPopup("game over!");
        myRow.classList.add("wobble-animation");
        dispatch(UpdateUserScore('6'));
        setTimeout(function () {
          myRow.classList.remove("wobble-animation");
        }, 3000);
        //Losing function;
      }
      else {
        await dispatch(newGuess());
        // dispatch(zeroUserGuess());
      }
    }
    else {
      // alert("word does not exsit!");
      createPopup("word does not exsit!");
      myRow.classList.add("wobble-animation");
    }
  }
  catch (error) {
    console.log(error)

  }
}
export const victory = (word, userGuess, currentGuess) => {
  Coloring(word, userGuess, currentGuess);
  // alert("congartuations!!");
  createPopup("congartuations!!");
  dispatch(UpdateUserScore(currentGuess.toString()));
}