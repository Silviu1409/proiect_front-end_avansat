import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getRAMs, getRAMs_filter } from '../controllers/RAM_Controller';
import { DocumentData } from 'firebase/firestore';
import { IRAM } from '../interfaces/IRAM';


export const RAMApi = createApi({
    reducerPath: "RAMApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllRAMs:  builder.query<Array<IRAM>, void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getRAMs()
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
        getRAMs_filter:  builder.mutation<Array<IRAM>, {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getRAMs_filter(field, val)
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

export const { useGetAllRAMsQuery, useGetRAMs_filterMutation } = RAMApi;