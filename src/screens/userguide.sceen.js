// @flow
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { primaryColor, secondaryColor } from '../../themes/colors';
import { withNamespaces } from 'react-i18next';
import color from 'color';

const styles = StyleSheet.create({
    image: {
        width: 430,
        height: 400,
        resizeMode: 'contain',
    },
    containerSignIn: {
        backgroundColor: primaryColor,
        height: '100%',
        width: '100%',
    },
    containerSignUp: {
        backgroundColor: '#ffffff',
        height: '100%',
        width: '100%',
    },
});

type Props = {
    done: () => void,
};

type State = {
    slides: any,
};

class UserGuide_ extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            slides: [
                {
                    key: 'mapDisocver',
                    title: props.t('mapTitle'),
                    text: props.t('mapSubtitle'),
                    image: require('../../assets/images/userguide/eventMap.jpg'),
                    imageStyle: styles.image,
                    backgroundColor: color(secondaryColor),
                },
                {
                    key: 'eventList',
                    title: props.t('eventListTitle'),
                    text: props.t('eventListSubtitle'),
                    image: require('../../assets/images/userguide/eventList.jpg'),
                    imageStyle: styles.image,
                    backgroundColor: color(secondaryColor)
                        .lighten(0.3)
                        .rgb(),
                },
                {
                    key: 'eventDetail',
                    title: props.t('eventDetailTitle'),
                    text: props.t('eventDetailSubtitle'),
                    image: require('../../assets/images/userguide/eventDetail.jpg'),
                    imageStyle: styles.image,
                    backgroundColor: color(secondaryColor)
                        .darken(0.3)
                        .rgb(),
                },
                {
                    key: 'orga',
                    title: props.t('orgaTitle'),
                    text: props.t('orgaSubtitle'),
                    image: require('../../assets/images/userguide/orga.jpg'),
                    imageStyle: styles.image,
                    backgroundColor: color(secondaryColor)
                        .lighten(0.6)
                        .rgb(),
                },
                {
                    key: 'createEvent',
                    title: props.t('createEventTitle'),
                    text: props.t('createEventSubtitle'),
                    image: require('../../assets/images/userguide/createEvent.jpg'),
                    imageStyle: styles.image,
                    backgroundColor: color(secondaryColor)
                        .darken(0.6)
                        .rgb(),
                },
            ],
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <AppIntroSlider
                    slides={this.state.slides}
                    nextLabel={this.props.t('next')}
                    doneLabel={this.props.t('done')}
                    onDone={this.props.done}
                />
            </View>
        );
    }
}

export const UserGuide = withNamespaces('UserGuide')(UserGuide_);
