// @flow

import type { UserObject } from './user.model.js';
import type { EventObject } from './event.model.js';

export type OrganisationObject = {
    id: string,
    name: string,
    admin: UserObject, 
    description: string,
    members: Array<UserObject>,
    eventSet: Array<EventObject>
}
