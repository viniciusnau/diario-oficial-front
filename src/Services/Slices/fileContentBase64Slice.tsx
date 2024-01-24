import { createSlice } from '@reduxjs/toolkit';
import services from '../services';

interface FileContentBase64State {
    data: string;
    loading: boolean;
    error: boolean | any[];
}

const initialState: FileContentBase64State = {
    data: '',
    loading: false,
    error: false,
};

const fileContentBase64Slice = createSlice({
    name: 'fileContentBase64',
    initialState,
    reducers: {
        getFileContentBase64: (state) => {
            state.loading = true;
            state.error = false;
            state.data = '';
        },
        getFileContentBase64Success: (state, actions) => {
            state.loading = false;
            state.error = false;
            state.data = actions.payload;
        },
        getFileContentBase64Failure: (state) => {
            state.loading = false;
            state.error = true;
            state.data = '';
        },
    },
});

export const {
    getFileContentBase64,
    getFileContentBase64Success,
    getFileContentBase64Failure,
} = fileContentBase64Slice.actions;

export const fetchFileContentBase64 =
    (file_name: string) =>
    async (
        dispatch: (arg0: {
            payload: any;
            type:
                | 'fileContentBase64/getFileContentBase64'
                | 'fileContentBase64/getFileContentBase64Success'
                | 'fileContentBase64/getFileContentBase64Failure';
        }) => void
    ) => {
        dispatch(getFileContentBase64());
        try {
            const response = await services.getFileContentBase64(file_name);
            dispatch(getFileContentBase64Success(response.data));
        } catch (err) {
            console.log('err: ', err);
            dispatch(getFileContentBase64Failure());
        }
    };

export default fileContentBase64Slice.reducer;
