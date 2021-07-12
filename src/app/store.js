import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../features/board/boardSlice'
import socketReducer from '../features/socket/socketSlice'

export const store = configureStore({
  reducer: {
    board: boardReducer,
    socket: socketReducer,
  },
});
