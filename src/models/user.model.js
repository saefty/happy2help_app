// @flow

import { LocationObject } from './location.model';

export type UserObject  = {
    username: string,
    profile: ProfileObject
}

type ProfileObject = {
    location: LocationObject
}