import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "../Reducer/flashcardSlice";

export const Store = configureStore({
  reducer: {
    flashcard: flashcardReducer,
  },
});
