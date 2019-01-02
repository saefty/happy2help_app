// @flow
import { Component } from 'react';
import * as React from 'react';
import { View } from 'react-native';
import { Query } from 'react-apollo';
import { GET_USER_IMG } from './image.query'

type Props = {
    children: () => React.Node,
};

export class ImageProvider extends Component<Props> {
    render() {
        return (
            <View>
                <Query query={GET_USER_IMG}>
                    {({ loading, error, data, refetch }) => {
                        if (loading) return null;
                        if (error) {
                            return null;
                        }
                        return this.props.children(data.user.image, refetch);
                    }}
                </Query>
            </View>
        );
    }
}
