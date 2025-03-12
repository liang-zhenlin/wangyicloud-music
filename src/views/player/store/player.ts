import { createSlice } from '@reduxjs/toolkit'

interface IPlayerState {
  currentSong: any
  playMode: any
}

const initialState: IPlayerState = {
  currentSong: {},
  playMode: {}
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {}
})

export default playerSlice.reducer
