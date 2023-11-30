import { createSlice } from '@reduxjs/toolkit';
import services from '../services';

interface PublicState {
    data: any[];
    loading: boolean;
    error: boolean | any[];
}

const initialState: PublicState = {
    data: [],
    loading: false,
    error: false,
};

const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {
        getPublic: (state) => {
            state.loading = true;
            state.error = false;
            state.data = [];
        },
        getPublicSuccess: (state, actions) => {
            state.loading = false;
            state.error = false;
            state.data = actions.payload;
        },
        getPublicFailure: (state, actions) => {
            state.loading = false;
            state.error = actions.payload ? actions.payload : true;
            state.data = [];
        },
    },
});
export const { getPublic, getPublicSuccess, getPublicFailure } =
    publicSlice.actions;

export const fetchPublic =
    (body: any, page?: string) =>
    async (
        dispatch: (arg0: {
            payload: any;
            type:
                | 'public/getPublic'
                | 'public/getPublicSuccess'
                | 'public/getPublicFailure';
        }) => void
    ) => {
        dispatch(getPublic());
        try {
            const response = await services.getPublic(body, page);
            if (response?.status < 300) {
                dispatch(getPublicSuccess(response.data));
            } else if (response?.status === 503) {
                dispatch(getPublicFailure({ status: 503 }));
            } else {
                throw new Error(response);
            }
        } catch (err) {
            console.log('err: ', err);
            dispatch(getPublicFailure({ status: 503 }));
        }
    };

export default publicSlice.reducer;
