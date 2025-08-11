import { createSlice } from "@reduxjs/toolkit";

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
    addList: (state, action) => {
      state.lists.unshift(action.payload);
      state.showInput = false;
    },
    updateList: (state, action) => {
      const { id, newText } = action.payload;
      state.lists = state.lists.map(list =>
        list.id === id ? { ...list, text: newText } : list
      );
      state.showInput = false;
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter(list => list.id !== action.payload);
      state.showInput = false;
    },
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

export const fetchListsRequest = () => ({
    type: 'FETCH_LISTS_REQUEST'
})

export const saveToMockAPIRequest = (method, data, id = null) => ({
    type: 'SAVE_TO_MOCK_API_REQUEST',
    payload: {method, data, id}
})

export const{
  setLists,
  addList,
  updateList,
  deleteList,
  setEditingList,
  toggleShowInput,
  setSearchQuery,
  togglePagiMode,
} = listSlice.actions

export default listSlice.reducer