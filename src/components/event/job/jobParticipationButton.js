// @flow
import type { Participation } from '../../../models/participation.model';
import React, { Component } from 'react';
import { Text, List, Button } from 'react-native-paper';
import { View } from 'react-native';
import { getNextParticipationActionAsHelper, getParticipationType } from '../../../models/participation.model';
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    participation: Participation,
    apply: (participation: Participation) => any,
    cancel: (participation: Participation) => any,
    t: i18n.t,
};

type State = {
    triggered: boolean,
};

class _JobParticipationButton extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            triggered: false,
        };
    }

    trigger = async () => {
        if (this.state.triggered) return;
        this.setState({ triggered: true });
        await this.getTriggerFunction()();
        this.setState({ triggered: false });
    };

    getTriggerFunction() {
        const nextState = getNextParticipationActionAsHelper(this.props.participation);
        switch (nextState) {
            case 'Applied':
                return async () => await this.props.apply(this.props.participation);
            case 'Canceled':
                return async () => await this.props.cancel(this.props.participation);
        }
        return () => {};
    }

    canBePressed = () => {
        const nextState = getNextParticipationActionAsHelper(this.props.participation);
        return nextState === 'Applied' || nextState === 'Canceled';
    };

    render() {
        return (
            <Button
                icon={getNextParticipationActionAsHelper(this.props.participation) === 'Canceled' ? 'clear' : 'check'}
                dark={true}
                loading={this.state.triggered || !this.canBePressed()}
                mode="contained"
                onPress={() => {
                    if (!(this.state.triggered || !this.canBePressed())) {
                        this.trigger();
                    }
                }}

                // disabled={this.state.triggered || !this.canBePressed()}
            >
                {this.props.t(getNextParticipationActionAsHelper(this.props.participation))}
            </Button>
        );
    }
}
export const JobParticipationButton = withNamespaces(['JobParticipationButton'])(_JobParticipationButton);
