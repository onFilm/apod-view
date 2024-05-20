import { createFeature, createReducer, on } from "@ngrx/store";
import { apodActions } from "./apod.action";
import { ApodState } from "../types/apod.interface";

// Initial state
const initialState: ApodState = {
    totalLikedImages: 0,
    likedImages: [] // Initialize as an empty array of strings
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
        })
    )
})

export const {
    name: apodFeatureKey, 
    reducer: apodReducer, 
    selectTotalLikedImages,
    selectLikedImages
} = apodFeature