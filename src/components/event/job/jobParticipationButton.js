// @flow
import type { Participation } from '../../../models/participation.model';
import React, { Component } from 'react';
import { Text, List, Button } from 'react-native-paper';
import { View } from 'react-native';
import { getNextParticipationActionAsHelper, getParticipationType } from '../../../models/participation.model';
import { withNamespaces, i18n } from 'react-i18next';
import { Formik } from 'formik';

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
    }

    trigger = async (_, action) => {
        await this.getTriggerFunction()();
        action.setSubmitting(false);
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
            <Formik onSubmit={this.trigger}>
                {({ isSubmitting, submitForm }) => {
                    return (
                        <Button
                            loading={isSubmitting}
                            disabled={isSubmitting || !this.canBePressed()}
                            mode="contained"
                            onPress={submitForm}
                        >
                            {this.props.t(getNextParticipationActionAsHelper(this.props.participation))}
                        </Button>
                    );
                }}
            </Formik>
        );
    }
}
export const JobParticipationButton = withNamespaces(['JobParticipationButton'])(_JobParticipationButton);
