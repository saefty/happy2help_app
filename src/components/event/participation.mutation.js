import gql from 'graphql-tag';

export const CREATE_PARTICIPATION = gql`
    mutation createParticipation($jobId: ID!) {
        createParticipation(jobId: $jobId) {
            id
            job {
                id
                participationSet {
                    id
                    state
                }
            }
        }
    }
`;

export const UPDATE_PARTICIPATION = gql`
    mutation updateParticipation($participationId: ID!, $state: Int!) {
        updateParticipation(participationId: $participationId, state: $state) {
            id
            job {
                id
                participationSet {
                    id
                    state
                }
            }
        }
    }
`;
