// @flow
import type { LocationObject } from './location.model';
import type { UserObject } from './user.model.js';

export type EventObject = {
    id: string,
    name: string,
    creator: UserObject, 
    description: string,
    organisation?: {
        name: string,
        description: string,
        id: string
    },
    location: LocationObject 
}