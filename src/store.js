import { configureStore, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from './APIconfig';

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

// Thunks để xử lý API
export const fetchLists = () => async (dispatch) => {
  try {
    const response = await axios.get(API_URL);
    dispatch(setLists(response.data));
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

export const saveToMockAPI = (method, data, id = null) => async (dispatch, getState) => {
  try {
    let response;
    if (method === 'post') {
      response = await axios.post(API_URL, data);
      dispatch(addList(response.data));
    } else if (method === 'put' && id) {
      response = await axios.put(`${API_URL}/${id}`, { id, text: data.text });
      dispatch(updateList({ id, newText: data.text }));
    } else if (method === 'delete' && id) {
      await axios.delete(`${API_URL}/${id}`);
      dispatch(deleteList(id));
    }
    // Đồng bộ lại danh sách sau khi lưu
    const updatedLists = await axios.get(API_URL);
    dispatch(setLists(updatedLists.data));
  } catch (error) {
    console.error('Error saving to MockAPI:', error);
  }
};

export const {
  setLists,
  addList,
  updateList,
  deleteList,
  setEditingList,
  toggleShowInput,
  setSearchQuery,
  togglePagiMode,
} = listSlice.actions;

export default configureStore({
  reducer: listSlice.reducer,
});