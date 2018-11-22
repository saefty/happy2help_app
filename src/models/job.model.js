// @flow
import type { UserObject } from './user.model.js';

export type Job = {
    id: number,
    name: string,
    description: string,
    totalPositions: number,
    participationSet: Array<UserObject>
}