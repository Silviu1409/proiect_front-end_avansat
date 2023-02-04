import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getGPUs, getGPUs_filter } from '../controllers/GPU_Controller';
import { DocumentData } from 'firebase/firestore';
import { IGPU } from '../interfaces/IGPU';


export const GPUApi = createApi({
    reducerPath: "GPUApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllGPUs:  builder.query<Array<IGPU>, void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getGPUs()
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
        getGPUs_filter:  builder.mutation<Array<IGPU>, {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getGPUs_filter(field, val)
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

export const { useGetAllGPUsQuery, useGetGPUs_filterMutation } = GPUApi;