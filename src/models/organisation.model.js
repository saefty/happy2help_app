// @flow

import type { UserObject } from './user.model.js';
import type { EventObject } from './event.model.js';
import type { ImageObject } from './location.model';

export type OrganisationObject = {
    id: string,
    name: string,
    admin: UserObject,
    description: string,
    members: Array<UserObject>,
    eventSet: Array<EventObject>,
    image: ImageObject,
};
