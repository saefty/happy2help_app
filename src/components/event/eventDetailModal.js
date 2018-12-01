// @flow
import type { EventObject } from '../../models/event.model';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Modal, Card, Title, Button, Paragraph, Text, Divider, Subheading } from 'react-native-paper';
import { JobList } from './job';
type Props = {
    event?: EventObject,
    visible: boolean,
    onDismiss: () => void
}
export class EventDetailModal extends Component<Props> {
    
    constructor(props: Props) {
        super(props);
    }

    renderCreator = () => {
        return (
            <Paragraph>
                Username: {this.props.event.creator.username}
            </Paragraph>
        )
    }

    renderOrganization = () => {
        return (
            <Paragraph>
                Organization: {this.props.event.organisation.name}
            </Paragraph>
        )
    }

    renderOwner = () => {
        let heading = ''
        let component = <Paragraph></Paragraph>;
        if(this.props.event.organisation) {
            heading = 'Organization'
            component = this.renderOrganization();
        }
        else if(this.props.event.creator) {
            heading = 'User'
            component = this.renderCreator();
        }
        return (
            <View>
                <Subheading>{heading}</Subheading>
                {component}
            </View>
        )
    }

    render() {
        if(!this.props.event) return <Text></Text>;
        return (
            <Modal visible={this.props.visible} onDismiss={this.props.onDismiss}>
                <Card>
                    <Card.Content>
                        <Title>{this.props.event.name} - {this.props.event.location ? this.props.event.location.name: ''}</Title>
                        <Paragraph>{this.props.event.description}</Paragraph>
                        <Divider />
                        <Subheading>Jobs</Subheading>
                        <JobList jobs={this.props.event.jobSet} />
                        {this.renderOwner()}
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={this.props.onDismiss}>Close</Button>
                    </Card.Actions>
                </Card>
            </Modal>
        );
    }
}