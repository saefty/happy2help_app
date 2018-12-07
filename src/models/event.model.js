// @flow
import type { LocationObject } from './location.model';
import type { UserObject } from './user.model.js';
import type { Job } from './job.model.js';
import type { OrganisationObject } from './organisation.model.js';

export type EventObject = {
    id: string,
    name: string,
    creator: UserObject, 
    description: string,
    organisation?: OrganisationObject,
    jobSet: Array<Job>,
    start: DateTime,
    end: DateTime,
    location: LocationObject 
}
