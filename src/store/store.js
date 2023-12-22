import {configureStore} from '@reduxjs/toolkit';
import rootReducer from '../reducers';
import authSlice from '../reducers/authSlice';

const store = configureStore({
    reducer :{
        auth:rootReducer
    },
});

export default store;