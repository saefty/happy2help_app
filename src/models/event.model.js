// @flow
import type { LocationObject } from './location.model';
import type { UserObject } from './user.model.js';
import type { Job } from './job.model.js';
import type { OrganisationObject } from './organisation.model.js';
import type { ImageObject } from './location.model';

export type EventObject = {
    id: string,
    name: string,
    creator: UserObject,
    description: string,
    image: ImageObject,
    organisation?: OrganisationObject,
    jobSet: Array<Job>,
    start: DateTime,
    end: DateTime,
    location: LocationObject,
};
