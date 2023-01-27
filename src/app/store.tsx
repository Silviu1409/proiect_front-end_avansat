import { configureStore } from "@reduxjs/toolkit";

import caseReducer from './features/case/caseReducer';

const store = configureStore({
    reducer: {
        case: caseReducer,
    },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch