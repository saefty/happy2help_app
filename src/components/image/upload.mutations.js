// @flow
import gql from 'graphql-tag';

export const uploadMutations = {
    UPLOAD_USER_IMG: gql`
        mutation($image: Upload!) {
            uploadImage(image: $image) {
                id
                url
                organisation {
                    id
                    name
                }
                event {
                    id
                    name
                }
                user {
                    id
                    username
                }
            }
        }
    `,
    UPLOAD_EVENT_IMG: gql`
        mutation($image: Upload!, $eventId: ID!) {
            uploadImage(image: $image, eventId: $eventId) {
                id
                url
                organisation {
                    id
                    name
                }
                event {
                    id
                    name
                }
                user {
                    id
                    username
                }
            }
        }
    `,
    UPLOAD_ORGA_IMG: gql`
        mutation($image: Upload!, $organisationId: ID!) {
            uploadImage(image: $image, organisationId: $organisationId) {
                id
                url
                organisation {
                    id
                    name
                }
                event {
                    id
                    name
                }
                user {
                    id
                    username
                }
            }
        }
    `,
    DELETE_IMG: gql`
        mutation($imageId: ID!) {
            deleteImage(imageId: $imageId) {
                publicId
                url
            }
        }
    `,
};
