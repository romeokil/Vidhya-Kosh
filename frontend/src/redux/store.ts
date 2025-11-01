import { combineReducers,configureStore } from "@reduxjs/toolkit";
import {persistReducer,persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import authReducer from './authSlice.ts'

const rootReducer=combineReducers({
    auth:authReducer,
});
const persistConfig={
    key:'root',
    version:1, // otherwise it will default take -1 as a version
    storage
}

const persistedReducer=persistReducer(persistConfig,rootReducer);

export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        })
})

// export default store;
export const persistor=persistStore(store);
