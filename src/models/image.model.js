// @flow

import type { UserObject } from './user.model';
import type { OrganisationObject } from './organisation.model';
import type { EventObject } from './event.model';

export type ImageObject  = {
    id: string,
    publicId: string,
    url: string,
    user?: UserObject,
    organisation?: OrganisationObject,
    event?: EventObject,
}
