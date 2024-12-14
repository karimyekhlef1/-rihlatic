import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PackageSearchState {
    packageType: string;
    volError: string;
}

export const packageEngineTypes = ['All', 'Oorganized trip', 'Circuit', 'Personalized trip', 'Omra', 'Cruise'];

const initialState: PackageSearchState = {
    packageType: 'All',
    volError: '',
};

const PackageSearchSlice = createSlice({
    name: 'volSearch',
    initialState,
    reducers: {
        setPackageType: (state, action: PayloadAction<string>) => {
            state.packageType = action.payload;
        },
    },
});

export const { setPackageType } = PackageSearchSlice.actions;

export default PackageSearchSlice.reducer;