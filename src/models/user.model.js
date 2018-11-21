// @flow

import { LocationObject } from './location.model';
import { CreditPoints } from '../components/profile/creditPoints/creditPoints';

export type UserObject  = {
    username: string,
    profile: ProfileObject
}

type ProfileObject = {
    location: LocationObject,
    creditPoints: number,
}