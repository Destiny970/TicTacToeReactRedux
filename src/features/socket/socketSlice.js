import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const socketSlice = createSlice({
    name: 'socket',
    initialState: {
        socket: null
    },
    reducers: {
        takeSocket: (state, { payload: socket }) => {
            state.socket = socket;
        },
    },
});

export const {takeSocket} = socketSlice.actions;

export default socketSlice.reducer;

export const getSocket = (state) => {
    return state.socket;
}

export const putGame = createAsyncThunk('socket/putGame', async (_, thunkAPI) => {
    const { board, socket } = thunkAPI.getState();
    socket.socket.send(JSON.stringify({type:"putGame", payload:{squares: board.squares, xIsNext: board.xIsNext}}));
})

export const resetBoard = createAsyncThunk('socket/putGame', async (_, thunkAPI) => {
    const { socket } = thunkAPI.getState();
    socket.socket.send(JSON.stringify({type:"putGame", payload:{squares: Array(9).fill(null), xIsNext: true,}}));
})