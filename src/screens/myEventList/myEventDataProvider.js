// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const GET_EVENTS = gql`
{
user {
        id
        eventSet {
            id
            name
            description
            organisation {
                id
      	        name
            }
          jobSet {
            id
            name
            description
            totalPositions	
            participationSet {
            	id
            }
          }
        }
        participationSet {
            id
            state
            job {
                id
                name
                description
            }
        }
   }
}
`;

type Props = {
    logOut: () => void,
    query:  graphql.query,
    children: () => Component<any,any>,
};

export class MyEventDataProvider extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Query query={GET_EVENTS}>
                    {({ loading, error, data }) => {
                        if (loading) return null;
                        if (error) {
                            console.warn(`Error! ${error.message}`);
                            return null;
                        }
                        return this.props.children(data.user);
                    }}
                </Query>
            </View>
        );
    }
}
