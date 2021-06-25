import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
const initialState = {
    squares: Array(9).fill(null),
    xIsNext: true,
    status: 'idle',
    error: null,
};

const axios = require('axios');

export const fetchData = createAsyncThunk('board/fetchData', async () => {
  const response = await axios.get('https://0o8gqkw13j.execute-api.us-east-2.amazonaws.com/game');
  return response.data.Item;
})

export const putData = createAsyncThunk('board/putData', async (_, thunkAPI) => {
  const { board } = thunkAPI.getState();
  console.log(board);
  const response = await axios.put('https://0o8gqkw13j.execute-api.us-east-2.amazonaws.com/game', board);
  return response;
})

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        handleClick: (state, { payload: i }) => {
            const squares = state.squares.slice();
            if (calculateWinner(state) || squares[i]) {
                return;
            }
            squares[i] = state.xIsNext ? 'X' : 'O';
            state.squares=squares;
            state.xIsNext=!state.xIsNext;
        },
    },
    extraReducers: {
      [fetchData.pending]: (state, action) => {
        state.status = 'loading';
      },
      [fetchData.fulfilled]: (state, action) => {
        console.log(action);
        state.status = 'succeeded';
        state.xIsNext = action.payload.xIsNext;
        state.squares = action.payload.squares;
      },
      [fetchData.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },
      [putData.pending]: (state, action) =>{
        state.status = 'loading';
      },
      [putData.fulfilled]: (state, action) =>{
        state.status = 'suceeded';
      },
      [putData.rejected]: (state, action) =>{
        state.status = 'failed';
        state.error = action.error.message;
      },
    },
});

export const {handleClick} = boardSlice.actions;

export default boardSlice.reducer;

export function calculateWinner(state) {
    const squares = state.squares
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export const getWinner = (state) => (
  calculateWinner(state.board)
)
export const getXIsNext = (state) => (
  state.board.xIsNext
)

export const squareData = (squareNum) => (state) => {
  return state.board.squares[squareNum]
}
