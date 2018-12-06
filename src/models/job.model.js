// @flow
import type { Participation } from './participation.model.js';

export type Job = {
    id: number,
    name: string,
    description: string,
    totalPositions: number,
    participationSet: Array<Participation>,
    currentUsersParticipation: Participation
}