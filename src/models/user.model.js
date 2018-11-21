// @flow

import type { LocationObject } from './location.model';

export type UserObject  = {
    username: string,
    profile: ProfileObject
}

type ProfileObject = {
    location: LocationObject
}