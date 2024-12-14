import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VolSearchState {
    volType: string;
    volMethod: string;
    volPassanger: volPassanger;
    volPackage: volPackage;
    volError: string;
}

interface volPassanger {
    adults: number;
    children: number;
    infants: number;
    infantsSeat: number;
    students: number;
    thirdAge: number;
}

interface volPackage {
    uniquePackage: boolean;
    refundable: boolean;
    directFlight: boolean;
    openReturn: boolean;
}

export const volEngineTypes = ['One Way', 'Return', 'Multi Destinations'];
export const volEngineMethods = ['Not Specified', 'Economy', 'Premium Economy', 'Business', 'First Class'];

const initialState: VolSearchState = {
    volType: volEngineTypes[0],
    volMethod: volEngineMethods[0],
    volPassanger: {
        adults: 1,
        children: 0,
        infants: 0,
        infantsSeat: 0,
        students: 0,
        thirdAge: 0,
    },
    volPackage: {
        uniquePackage: false,
        refundable: false,
        directFlight: false,
        openReturn: false,
    },
    volError: '',
};

const volSearchSlice = createSlice({
    name: 'volSearch',
    initialState,
    reducers: {
        setVolType: (state, action: PayloadAction<string>) => {
            state.volType = action.payload;
        },
        setVolMethod: (state, action: PayloadAction<string>) => {
            state.volMethod = action.payload;
        },
        setVolPassanger: (state, action: PayloadAction<volPassanger>) => {
            state.volPassanger = action.payload;
        },
        setVolPackage: (state, action: PayloadAction<volPackage>) => {
            state.volPackage = action.payload;
            console.log(state.volPackage);
        },
        setVolError: (state, action: PayloadAction<string>) => {
            state.volError = action.payload;
        },
    },
});

export const { setVolType, setVolMethod, setVolPassanger, setVolPackage, setVolError } = volSearchSlice.actions;

export default volSearchSlice.reducer;