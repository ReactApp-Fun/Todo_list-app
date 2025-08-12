import { takeEvery, takeLatest, call, put } from 'redux-saga/effects';
import { api } from '../api/api';
import { API_URL } from '../api/domain';

import {
  setLists,
  addListSuccess,
  updateListSuccess,
  deleteListSuccess
} from '../redux-saga/store';


function* fetchListsSaga() {
  try {
    const data = yield call(api.getAll, `${API_URL}`);
    if (!data.error) {
      yield put(setLists(data));
    }
  } 
  catch (error) {
    console.error('Error fetching lists: ', error);
  }
}

function* saveToMockAPISaga(action) {
  const { method, data, id } = action.payload;
  try {
    let response;
    if (method === 'post') {
      response = yield call(api.add, `${API_URL}`, data);
      if (!response.error) yield put(addListSuccess(response));
    } else if (method === 'put') {
      response = yield call(api.update, `${API_URL}`, id, data);
      if (!response.error) yield put(updateListSuccess({ id, newText: data.text }));
    } else if (method === 'delete') {
      yield call(api.remove, `${API_URL}`, id);
      yield put(deleteListSuccess(id));
    }
  } catch (error) {
    console.error(`Error with ${method} request: `, error);
  }
}

export function* rootSaga() {
  yield takeLatest('list/fetchListsRequest', fetchListsSaga);
  yield takeEvery('list/saveToMockAPIRequest', saveToMockAPISaga);
}
