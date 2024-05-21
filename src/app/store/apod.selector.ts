import { createSelector } from "@ngrx/store";
import { selectLikedImages } from "./apod.reducer";

// Selector to check if a specific date is present in the liked images array
export const isDateLiked = (date: string) => createSelector(
  selectLikedImages,
  (likedImages: string[]) => likedImages.includes(date)
);