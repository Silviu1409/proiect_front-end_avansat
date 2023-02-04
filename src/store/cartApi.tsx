import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { DocumentData } from 'firebase/firestore';
import { get_orders, place_order } from '../controllers/Cart_Controller';


export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        post_cart:  builder.mutation<[], any>({
            queryFn: async(data) => {
                try{
                    await place_order(data);
                    return { data: data };
                } catch (e){
                    return  { error: e }
                }
            }
        }),
        get_orders:  builder.query<[], string>({
            queryFn: async(user) => {
                try{
                    let result: [] = [];

                    await get_orders(user)
                    .then(
                        (data: DocumentData[]) => {
                            result = data as [];
                        }
                    );
                    return { data: result }
                } catch (e){
                    return  { data: [] }
                }
            }
        }),
    })
});

export const { usePost_cartMutation, useGet_ordersQuery } = cartApi;