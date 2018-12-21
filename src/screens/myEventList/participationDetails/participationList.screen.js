// @flow
import React, { Component } from 'react';
import { View } from 'react-native';
import { ViewApplicants } from '../../../screens/myEventList/viewApplicants.screen';

type Props = {};
export class PartcipationListScreen extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return <ViewApplicants event={this.props.screenProps.event} />;
    }
}
