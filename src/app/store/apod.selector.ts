import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ApodState } from "../types/apod.interface";

// Select the apod feature state
const selectApodState = createFeatureSelector<ApodState>('apod');

// Create a selector to check if a given date is present in the likedImages array
export const isDateLiked = (date: string) =>
  createSelector(
    selectApodState,
    (state) => state.likedImages.includes(date)
  );