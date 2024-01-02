import { configureStore,  combineReducers} from '@reduxjs/toolkit'
import userReducer from './userSlice'

import { persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import thunk from 'redux-thunk';
 
 
const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  user: userReducer,
})
 
const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,

  middleware: [thunk]
})

export default store