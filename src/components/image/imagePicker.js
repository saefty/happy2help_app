// @flow
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View, Text, TouchableOpacity } from 'react-native';
import { Modal, Portal } from 'react-native-paper';

import { primaryColor } from '../../../themes/colors';
import { styles } from './imagePicker.style'
import { withNamespaces, i18n } from 'react-i18next';

type Props = {
    t: i18n.t,
    visible: boolean,
    hideModal: () => void,
    takeImage: () => void,
    pickImage: () => void,
    deleteImage: () => void,
};

class _ImagePicker extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Portal>
                <Modal visible={this.props.visible} onDismiss={this.props.hideModal}>
                    <View style={styles.modal}>
                        <View style={styles.modalView}>
                            <TouchableOpacity style={styles.modalOptions} onPress={this.props.takeImage}>
                                <Icon name={'add-a-photo'} size={30} color={primaryColor} />
                                <Text style={styles.buttonText}>{this.props.t('take')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOptions} onPress={this.props.pickImage}>
                                <Icon name={'image'} size={30} color={primaryColor} />
                                <Text style={styles.buttonText}>{this.props.t('gallery')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalOptions} onPress={this.props.deleteImage}>
                                <Icon name={'delete'} size={30} color="red" />
                                <Text style={styles.buttonDelete}>{this.props.t('remove')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Portal>
        );
    }
}

export const ImagePicker = withNamespaces(['Image'])(_ImagePicker);
