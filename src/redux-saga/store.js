import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import listSaga from './listSaga';
import listSlice from './listSlice'

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: listSlice.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(listSaga)

export default store