import { combineReducers, configureStore } from '@reduxjs/toolkit';
import SupplierReducer from '../store/Supplier/reducer';

const rootReducer = combineReducers({
  supplier: SupplierReducer,
});

export const store = configureStore({
  reducer: rootReducer
})