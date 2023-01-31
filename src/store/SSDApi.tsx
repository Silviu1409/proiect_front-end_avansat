import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getSSDs, getSSDs_filter } from '../controllers/SSD_Controller';
import { DocumentData } from 'firebase/firestore';


export const SSDApi = createApi({
    reducerPath: "SSDApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllSSDs:  builder.query<[], void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getSSDs()
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
        getSSDs_filter:  builder.mutation<[], {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getSSDs_filter(field, val)
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

export const { useGetAllSSDsQuery, useGetSSDs_filterMutation } = SSDApi;