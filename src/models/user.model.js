// @flow

import type { LocationObject } from './location.model';
import type { ImageObject } from './location.model';

export type UserObject  = {
    username: string,
    profile: ProfileObject,
    skills?: skill[],
    image: ImageObject,
}

type ProfileObject = {
    location?: LocationObject,
    creditPoints: number,
}