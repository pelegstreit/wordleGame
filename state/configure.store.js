import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import gameReducer from "./game.slice";

let lastSavedData = {word:'',
userGuess:'',
currentGuess:1,
currentLetter:1,
wordExist: true,
usedWords:[],
currentGuessedWords: [],
userScore: {'1':0, '2':0, '3':0,'4':0,'5':0,'6':0},
isLoading: false,
errorMessage: '',};
const local = localStorage.getItem("gameStorage");
if (local) lastSavedData = JSON.parse(local);
const initialAppState = lastSavedData;

const saveToStorage = (store) => (next) => (action) => {
  console.log("dispatching", action);
  next(action);
  window.localStorage.setItem("gameStorage", JSON.stringify(store.getState()));
};

const store = configureStore({
  reducer: {
    game: gameReducer,

  },
  preloadedState: initialAppState,
  middleware:(getDefaultMiddleware)=> [...getDefaultMiddleware(), saveToStorage]
});

export default store;
