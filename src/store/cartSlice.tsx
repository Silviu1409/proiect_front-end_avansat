import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify"

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems") as any) : [],
    cartTotalAmount: localStorage.getItem("cartTotalAmount") ? JSON.parse(localStorage.getItem("cartTotalAmount") as any) : 0,
    cartNoItems: localStorage.getItem("cartNoItems") ? JSON.parse(localStorage.getItem("cartNoItems") as any) : 0
};

const cartSlice = createSlice({
    name: "Shopping cart",
    initialState,
    reducers: {
        addToCart(state: any, action){
            const itemIdx = state.cartItems.findIndex(
                (item: any) => item.id === action.payload.id
            );

            state.cartTotalAmount += action.payload.pret;

            if (itemIdx >= 0){
                state.cartItems[itemIdx].cartQuantity += 1;
                toast.info(`Inca un ${action.payload.denumire} adaugat!`, { position: "bottom-left" });
            } else {
                const tmpItem = {...action.payload, cartQuantity: 1};
                state.cartItems.push(tmpItem);
                state.cartNoItems += 1;
                toast.success(`${action.payload.denumire} adaugat in cos!`, { position: "bottom-left" });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            localStorage.setItem("cartNoItems", JSON.stringify(state.cartNoItems));
        },
        removeItem(state: any, action){
            const restCartItem = state.cartItems.filter(
                (item: any) => item.id !== action.payload.id
            );

            state.cartItems = restCartItem;

            let new_total = 0;
            state.cartItems.forEach((item: any) => {
                new_total += item.pret * item.cartQuantity;
            });

            state.cartTotalAmount = new_total;

            state.cartNoItems -= 1;

            toast.error(`${action.payload.denumire} sters din cos!`, {position: "bottom-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            localStorage.setItem("cartNoItems", JSON.stringify(state.cartNoItems));
        },
        decItems(state: any, action){
            const itemIdx = state.cartItems.findIndex(
                (item: any) => item.id === action.payload.id
            );

            if (state.cartItems[itemIdx].cartQuantity > 1) {
                state.cartItems[itemIdx].cartQuantity -= 1;
                state.cartTotalAmount -= state.cartItems[itemIdx].pret;

                toast.info(`Numar scazut pentru ${action.payload.denumire}`, {position: "bottom-left"});
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
        },
        incItems(state: any, action){
            const itemIdx = state.cartItems.findIndex(
                (item: any) => item.id === action.payload.id
            );

            state.cartItems[itemIdx].cartQuantity += 1;
            state.cartTotalAmount += state.cartItems[itemIdx].pret;

            toast.info(`Numar crescut pentru ${action.payload.denumire}`, {position: "bottom-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
        },
        clearCart(state: any){
            state.cartItems = [];
            state.cartTotalAmount = 0;
            state.cartNoItems = 0;
            
            toast.error(`Cosul a fost golit!`, {position: "bottom-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            localStorage.setItem("cartNoItems", JSON.stringify(state.cartNoItems));
        },
        resetCart(state: any){
            state.cartItems = [];
            state.cartTotalAmount = 0;
            state.cartNoItems = 0;
            
            toast.success(`Comanda a fost plasata!`, {position: "bottom-left"});

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            localStorage.setItem("cartTotalAmount", JSON.stringify(state.cartTotalAmount));
            localStorage.setItem("cartNoItems", JSON.stringify(state.cartNoItems));
        }
    }
});

export const { addToCart, removeItem, decItems, incItems, clearCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;