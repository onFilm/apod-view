import { createActionGroup, emptyProps, props } from "@ngrx/store";


export const apodActions = createActionGroup({
    source: 'apod',
    events: {
         '[APOD] likedImages': emptyProps(),
         '[APOD] like': props<{ date: string }>(),
         '[APOD] unlike': props<{ date: string }>()
    }
})