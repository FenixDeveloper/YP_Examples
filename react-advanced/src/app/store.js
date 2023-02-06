import { configureStore } from '@reduxjs/toolkit';
import tableReducer from "../features/editableTable/tableSlice";

export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
});
