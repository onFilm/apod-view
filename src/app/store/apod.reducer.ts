import { createFeature, createReducer, on } from "@ngrx/store";
import { apodActions } from "./apod.action";
import { ApodState } from "../types/apod.interface";

// Initial state
const initialState: ApodState = {
    totalLikedImages: 0,
    likedImages: [], // Initialize as an empty array of strings
    fullRecordImageLoading: false
};

const apodFeature = createFeature({
    name: 'apod',
    reducer: createReducer(
        initialState,
        on(apodActions["[APOD]LikedImages"], (state) => (state)),
        on(apodActions["[APOD]Like"], (state, { date }) => {
            // Check if the date already exists in the likedImages array
            if (state.likedImages.includes(date)) {
                return state; // Date already exists, do not update state
            } else {
                return {
                    ...state,
                    totalLikedImages: state.totalLikedImages + 1, // Increment totalLikedImages count
                    likedImages: [...state.likedImages, date] // Add new liked image date to the array
                };
            }
        }),
        on(apodActions['[APOD]Unlike'], (state, { date }) => {
            if(state.likedImages.includes(date)) {
                return {
                    ...state,
                    totalLikedImages: state.totalLikedImages -1,
                    likedImages: state.likedImages.filter(imageDate => imageDate !== date)
                }
                } else {
                    return state;
                }
            }
        ),
        on(apodActions['[APOD]FullRecordImageLoading'], (state, { loaded }) => {
            return {
                ...state,
                fullRecordImageLoading: loaded
            }
        }),
    )
})

export const {
    name: apodFeatureKey, 
    reducer: apodReducer, 
    selectTotalLikedImages,
    selectLikedImages,
    selectFullRecordImageLoading
} = apodFeature