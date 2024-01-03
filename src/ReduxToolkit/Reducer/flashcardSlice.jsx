import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flashcards: localStorage.getItem('flashcards') ? JSON.parse(localStorage.getItem('flashcards')) : [],
};

const updateLocalStorage = (arr) => {
  localStorage.setItem('flashcards', JSON.stringify(arr));
};

export const flashcardSlice = createSlice({
  name: 'flashcard',
  initialState,
  reducers: {
    // Add New Flashcards
    addFlashCard: (state, action) => {
      state.flashcards.push({
        card: action.payload,
      });
      updateLocalStorage(state.flashcards);
    },
  },
});

export const { addFlashCard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
