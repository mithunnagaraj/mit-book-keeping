import { applyMiddleware, compose, configureStore, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userSessionReducer from './reducer/user-session.reducer';

export default configureStore({
  reducer: {
    userSession: userSessionReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})
