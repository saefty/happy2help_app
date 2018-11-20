// @flow

import type { LocationObject } from './location.model';

export type UserObject  = {
    username: string,
    profile: ProfileObject,
    skills?: skill[],
}

type ProfileObject = {
    location?: LocationObject
}