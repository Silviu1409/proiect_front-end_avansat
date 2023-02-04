import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getPSUs, getPSUs_filter } from '../controllers/PSU_Controller';
import { DocumentData } from 'firebase/firestore';
import { IPSU } from '../interfaces/IPSU';


export const PSUApi = createApi({
    reducerPath: "PSUApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllPSUs:  builder.query<Array<IPSU>, void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getPSUs()
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
        getPSUs_filter:  builder.mutation<Array<IPSU>, {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getPSUs_filter(field, val)
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

export const { useGetAllPSUsQuery, useGetPSUs_filterMutation } = PSUApi;