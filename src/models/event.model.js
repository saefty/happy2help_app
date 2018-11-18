// @flow
import type { LocationObject } from './location.model';

export type EventObject = {
    id: string,
    name: string,
    description: string,
    organisation?: {
        name: string,
        description: string,
        id: string
    },
    location: LocationObject 
}