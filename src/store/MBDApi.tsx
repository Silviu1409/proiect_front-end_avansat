import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getMBDs, getMBDs_filter } from '../controllers/MBD_Controller';
import { DocumentData } from 'firebase/firestore';
import { IMBD } from '../interfaces/IMBD';


export const MBDApi = createApi({
    reducerPath: "MBDApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllMBDs:  builder.query<Array<IMBD>, void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getMBDs()
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
        getMBDs_filter:  builder.mutation<Array<IMBD>, {field: string, val: any}>({
            queryFn: async({field, val}) => {
                try{
                    let result: [] = [];
                    await getMBDs_filter(field, val)
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

export const { useGetAllMBDsQuery, useGetMBDs_filterMutation } = MBDApi;