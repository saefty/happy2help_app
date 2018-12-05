import gql from "graphql-tag";

export const CREATE_PARTICIPATION = gql`
    mutation createParticipation($jobId: ID!) {
        createParticipation(jobId: $jobId) {
            participation {
                id
            }
        }
    }
`

export const UPDATE_PARTICIPATION = gql`
    mutation createParticipation($participationId: ID!, $state: Int!) {
        updateParticipation(participationId: $participationId, state: $state) {
            participation {
                id
            }
        }
    }
`