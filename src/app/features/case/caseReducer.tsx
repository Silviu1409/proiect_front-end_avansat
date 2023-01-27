import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocumentData } from 'firebase/firestore';
import { getCases } from '../../../controllers/Case_Controller';

type InitialState = {
    carcase: DocumentData[]
}

const initialState: InitialState = {
    carcase: []
}

const slice = createSlice({
    name: 'case',
    initialState,
    reducers: {
        getAll: (state) => {
            getCases()
            .then(
                (data: DocumentData[]) => {
                    state.carcase = data;
                }
            );
            
        }
    }
})

export default slice.reducer
export const {getAll} = slice.actions