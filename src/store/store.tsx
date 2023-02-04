import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { cartApi } from "./cartApi";
import cartReducer from "./cartSlice";
import { caseApi } from "./caseApi";
import { CPUApi } from "./CPUApi";
import { GPUApi } from "./GPUApi";
import { MBDApi } from "./MBDApi";
import { PSUApi } from "./PSUApi";
import { RAMApi } from "./RAMApi";
import { SSDApi } from "./SSDApi";


export const store = configureStore({
    reducer: {
        [caseApi.reducerPath]: caseApi.reducer,
        [CPUApi.reducerPath]: CPUApi.reducer,
        [GPUApi.reducerPath]: GPUApi.reducer,
        [PSUApi.reducerPath]: PSUApi.reducer,
        [RAMApi.reducerPath]: RAMApi.reducer,
        [MBDApi.reducerPath]: MBDApi.reducer,
        [SSDApi.reducerPath]: SSDApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(caseApi.middleware)
                                                                .concat(CPUApi.middleware)
                                                                .concat(GPUApi.middleware)
                                                                .concat(PSUApi.middleware)
                                                                .concat(RAMApi.middleware)
                                                                .concat(MBDApi.middleware)
                                                                .concat(SSDApi.middleware)
                                                                .concat(cartApi.middleware)
})

setupListeners(store.dispatch);