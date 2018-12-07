// @flow
import type { LocationObject } from './location.model';
import type { UserObject } from './user.model.js';
import type { Job } from './job.model.js';

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
    jobSet: Array<Job>,
    start: DateTime,
    end: DateTime,
    location: LocationObject 
}