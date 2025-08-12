import { configureStore, createSlice } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './saga'

const sagaMiddleware = createSagaMiddleware();

const listSlice = createSlice({
  name: 'list',
  initialState: {
    lists: [],
    editingList: null,
    showInput: false,
    searchQuery: '',
    defaultIsPagi: true,
  },
  reducers: {
    setLists: (state, action) => {
      state.lists = action.payload;
    },
    addListSuccess: (state, action) => {
      state.lists.unshift(action.payload);
      state.showInput = false;
    },
    updateListSuccess: (state, action) => {
      const { id, newText } = action.payload;
      state.lists = state.lists.map(list =>
        list.id === id ? { ...list, text: newText } : list
      );
      state.showInput = false;
    },
    deleteListSuccess: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      state.showInput = false;
    },

    fetchListsRequest: () => {},
    saveToMockAPIRequest: (state, action) => {},

    setEditingList: (state, action) => {
      state.editingList = action.payload;
      state.showInput = !!action.payload;
    },
    toggleShowInput: (state) => {
      state.showInput = !state.showInput;
      if (state.showInput) state.editingList = null;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    togglePagiMode: (state) => {
      state.defaultIsPagi = !state.defaultIsPagi;
    },
  },
});

export const {
  setLists,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess,
  fetchListsRequest,
  saveToMockAPIRequest,
  setEditingList,
  toggleShowInput,
  setSearchQuery,
  togglePagiMode
} = listSlice.actions;

export const store = configureStore({
  reducer: {list: listSlice.reducer},
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({thunk: false}).concat(sagaMiddleware)
}})

sagaMiddleware.run(rootSaga)