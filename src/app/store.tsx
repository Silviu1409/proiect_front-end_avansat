import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { caseApi } from "./features/case/caseApi";


export const store = configureStore({
    reducer: {
        [caseApi.reducerPath]: caseApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(caseApi.middleware),
})

setupListeners(store.dispatch);