/* @flow */

import React, { Component } from 'react';
import { Text, View, Image, TouchableHighlight, Animated } from 'react-native';

import { styles } from './panel.style';

type Props = {
    title: string,
    children: React.PropTypes.node,
    initialExpansion: boolean
};

type State = {
    title: string,
    expanded: boolean,
    animation: Animated.Value,
    up: Image,
    down: Image,
    minHeight: number,
    maxHeight: number
};

class Panel extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        let anim = new Animated.Value();
        if (!this.props.initialExpansion) {
            // set this value depending on how big the title container is
            anim = new Animated.Value(60);
        } 

        this.state = {
            title: props.title,
            expanded: this.props.initialExpansion,
            up: require('./../../../../assets/images/arrow-up.png'),
            down: require('./../../../../assets/images/arrow-down.png'),
            animation: anim,    // determines actual height of the container
            minHeight: 50
        };
    }

    _setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height,
        });
    }

    _setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height + 14, // center panel title
        });
    }

    toggle() {
        let initialValue = this.state.expanded ? this.state.maxHeight + this.state.minHeight : this.state.minHeight,
            finalValue = this.state.expanded ? this.state.minHeight : this.state.maxHeight + this.state.minHeight;

        this.setState({
            expanded: !this.state.expanded,
        });

        this.state.animation.setValue(initialValue);
        Animated.spring(this.state.animation, {
            toValue: finalValue,
        }).start();
    }

    render() {
        let icon = this.state['down'];

        if (this.state.expanded) {
            icon = this.state['up'];
        }

        //Step 5
        return (
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
                <View style={styles.container}>
                    <View style={styles.titleContainer} onLayout={this._setMinHeight.bind(this)}>
                        <Text style={styles.title}>{this.state.title}</Text>
                        <TouchableHighlight style={styles.button} onPress={this.toggle.bind(this)} underlayColor="#f1f1f1">
                            <Image style={styles.buttonImage} source={icon} />
                        </TouchableHighlight>
                    </View>

                    <View style={styles.body} onLayout={this._setMaxHeight.bind(this)}>
                        {this.props.children}
                    </View>
                </View>
            </Animated.View>
        );
    }
}
export default Panel;
