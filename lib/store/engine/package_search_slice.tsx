import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DateRange } from 'react-day-picker';
import { setSelectedOption } from '../custom/searchSlices/travelOptionsSlice';

interface PackageSearchState {
    packageType: string;
    dateRange: DateRange;
    volError: string;
    selectedDestinationId:number | null
}

export const packageEngineTypes = ['All', 'Oorganized trip', 'Circuit', 'Personalized trip', 'Omra', 'Cruise'];

const initialState: PackageSearchState = {
    packageType: 'All',
    dateRange: {
        from: new Date(),
        to: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    },
    selectedDestinationId:null,
    volError: '',
};

const PackageSearchSlice = createSlice({
    name: 'packageSearch',
    initialState,
    reducers: {
        setPackageType: (state, action: PayloadAction<string>) => {
            state.packageType = action.payload;
        },
        setSelectedDestinationId: (state, action: PayloadAction<number | null>) => {
            state.selectedDestinationId = action.payload;
        },
        setDateRange: (state, action: PayloadAction<DateRange>) => {
            state.dateRange = action.payload;
        }
    },
});

export const { setPackageType, setDateRange , setSelectedDestinationId } = PackageSearchSlice.actions;

export default PackageSearchSlice.reducer;