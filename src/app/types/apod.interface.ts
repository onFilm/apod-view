// Define the type of the state
export interface ApodState {
    totalLikedImages: number;
    likedImages: string[];
    fullRecordImageLoading: boolean;
}

export interface ApodData {
    date: string;
    explanation: string;
    media_type: string;
    title: string;
    url: string;
    hdurl?: string;
    credit?: string;
}