import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCPUs, getCPUs_filter } from '../controllers/CPU_Controller';
import { DocumentData } from 'firebase/firestore';
import { ICPU } from '../interfaces/ICPU';


export const CPUApi = createApi({
    reducerPath: "CPUApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllCPUs:  builder.query<Array<ICPU>, void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getCPUs()
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
        getCPUs_filter:  builder.mutation<Array<ICPU>, {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getCPUs_filter(field, val)
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

export const { useGetAllCPUsQuery, useGetCPUs_filterMutation } = CPUApi;