// @flow
import type { Job } from './job.model.js';
import type { UserObject } from './user.model.js';

export type Participation = {
    id: number,
    state: ParticipationEnum,
    user?: UserObject,
    job?: Job,
    // rating
}

export type ParticipationEnum = $Keys<typeof participationTypes>;

export function getNextParticipationActionAsHelper(participation?: Participation): ParticipationEnum {
    if(!participation) return 'Applied';
    const currentType: ParticipationEnum = typeof participation.state === 'number' ? 
        getParticipationType(participation.state) : participation.state;
    switch(currentType) {
        case 'Participated':
            return 'Participated';
        case 'Applied':
            return 'Canceled';
        case 'Declined': 
            return 'Declined';
        case 'Accepted': 
            return 'Canceled';
        case 'Canceled':
            return 'Applied'
    }
    return 'Applied';
}

export function getParticipationType(type: ParticipationEnum): ParticipationEnum {
    if(typeof type === 'string') return type;
    switch(type){
        case 1: return 'Participated';
        case 2: return 'Applied';
        case 3: return 'Declined';
        case 4: return 'Accepted';
        case 5: return 'Canceled';
    }
    return 'Canceled'
}

export const participationTypes = {
    'Participated': 1,
    'Applied':      2,
    'Declined':     3,
    'Accepted':     4,
    'Canceled':     5
}
