import {lazy} from "react";


export const NotFound = lazy(async () => {
    try {
        return  import('./NotFound').then(async (module) => {
            return { default: module.NotFound };
        });
    } catch (error) {
        console.log('Lazy loader error');
        throw error;
    }
});

export const Resume = lazy(async () => {
    try {
        return  import('./Resume').then(async (module) => {
            return { default: module.Resume };
        });
    } catch (error) {
        console.log('Lazy loader error');
        throw error;
    }
});

