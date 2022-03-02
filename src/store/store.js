import { applyMiddleware, compose, configureStore, createStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk';
import userSessionReducer from './reducer/user-session.reducer';

export default configureStore({
  reducer: {
    userSession: userSessionReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ['your/action/type'],
      // Ignore these field paths in all actions
      ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
      // Ignore these paths in the state
      ignoredPaths: ['items.dates'],
    },
  }),
})
