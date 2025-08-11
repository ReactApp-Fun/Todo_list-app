import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { API_URL } from './APIconfig';

import {
  setLists,
  addList,
  updateList,
  deleteList,
  setEditingList,
  toggleShowInput,
  setSearchQuery,
  togglePagiMode,
} from './listSlice';

function* fetchLists(){
  try {
    const response = yield call(axios.get, API_URL);
    yield put(setLists(response.data));
  } catch (error) {
    console.error('Error fetching lists:', error);
  }
};

function* saveToMockAPI(action){
  try {
    const {method, data, id} = action.payload
    let response;

    if (method === 'post') {
      response = yield call(axios.post, API_URL, data);
      yield put(addList(response.data));
    } else if (method === 'put' && id) {
      response = yield call(axios.put, `${API_URL}/${id}`, { id, text: data.text });
      yield put(updateList({ id, newText: data.text }));
    } else if (method === 'delete' && id) {
      yield call(axios.delete, `${API_URL}/${id}`);
      yield put(deleteList(id));
    }
    // Đồng bộ lại danh sách sau khi lưu
    const updatedLists = yield call(axios.get, API_URL);
    yield put(setLists(updatedLists.data));
  } catch (error) {
    console.error('Error saving to MockAPI:', error);
  }
};

export default function* listSaga(){
  yield takeLatest('FETCH_LISTS_REQUEST', fetchLists);
  yield takeLatest('SAVE_TO_MOCK_API_REQUEST', saveToMockAPI )
}