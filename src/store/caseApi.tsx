import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getCases, getCases_placa_compat } from '../controllers/Case_Controller';
import { DocumentData } from 'firebase/firestore';

export const caseApi = createApi({
    reducerPath: "caseApi",
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        getAllCases:  builder.query<[], void>({
            queryFn: async() => {
                try{
                    let result: [] = [];
                    await getCases()
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
        getCases_placa_compat:  builder.mutation<[], string>({
            queryFn: async(placa_compat) => {
                try{
                    let result: [] = [];
                    await getCases_placa_compat(placa_compat)
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

export const { useGetAllCasesQuery, useGetCases_placa_compatMutation } = caseApi;