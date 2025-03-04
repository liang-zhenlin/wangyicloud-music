import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getBanners, getHotRecommend, getNewAlbum } from '../service/recommend'

export const fetchBannerDataAction = createAsyncThunk(
  'banners',
  async (arg, { dispatch }) => {
    const res = await getBanners()
    dispatch(changeBannersAction(res.banners))
  }
)

export const fetchHotRecommendAction = createAsyncThunk(
  'hotRecommend',
  async (arg, { dispatch }) => {
    const res = await getHotRecommend(8)
    dispatch(changeHotRecommendAction(res.result))
  }
)

export const fetchNewAlbumAction = createAsyncThunk(
  'newAlbum',
  async (argv, { dispatch }) => {
    const res = await getNewAlbum()
    dispatch(changeNewAlbumsAction(res.albums))
  }
)

interface IRecommendState {
  banners: any[]
  hotRecommends: any[]
  newAlbums: any[]
}

const initialState: IRecommendState = {
  banners: [],
  hotRecommends: [],
  newAlbums: []
}

const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newAlbums = payload
    }
  }
})

export const {
  changeBannersAction,
  changeHotRecommendAction,
  changeNewAlbumsAction
} = recommendSlice.actions
export default recommendSlice.reducer
