/* @flow */

import React, { Component } from 'react';
import { View } from 'react-native';
import { TextInput, HelperText, Subheading, Headline, Appbar } from 'react-native-paper';
import { Formik, ErrorMessage } from 'formik';
import { withNamespaces, i18n } from 'react-i18next';
import { graphql, compose } from 'react-apollo';
import * as Yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import { showMessage, hideMessage } from "react-native-flash-message";

import type { OrganisationObject } from '../../../models/organisation.model';
import { H2HTheme } from './../../../../themes/default.theme';
import { styles } from '../viewOrganisation.style';
import { mutations } from './editOrganisation.mutations.js';
import OrganisationProfilePicture from '../organisationProfilePicture';

type Props = {
    organisation?: OrganisationObject,
    t: i18n.t,
    updateOrganisationMutation: graphql.mutate,
    createOrganisationMutation: graphql.mutate,
    close: () => void,
};

type State = {
    validationSchema: Yup.Schema,
};

class _EditOrganisationView extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        const OrganisationSchema = Yup.object().shape({
            organisationName: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
            organisationDescription: Yup.string()
                .min(5, this.props.t('errors:toShort'))
                .required(this.props.t('errors:required')),
        });
        this.state = { validationSchema: OrganisationSchema };
    }

    create = organisation => {
        return this.props.createOrganisationMutation({
            variables: {
                name: organisation.name,
                description: organisation.description,
            },
        });
    };

    onSubmit = async (values, actions) => {
        actions.setSubmitting(true);
        const ORGANISATION = {
            name: values.organisationName,
            description: values.organisationDescription,
        };

        await this.create(ORGANISATION);
        actions.setSubmitting(false);
        this.props.close();
        showMessage({
            message: this.props.t('creationSuccess') + values.organisationName,
            type: "success",
            icon: 'auto',
          });
        return;
    };

    render() {
        return (
            <View>
                <Formik validationSchema={this.state.validationSchema} onSubmit={this.onSubmit} initialValues={{}}>
                    {({ errors, handleChange, handleSubmit, isSubmitting, values }) => (
                    <View>
                        <View style={{elevation: 0}}>
                            <Appbar.Header>
                                <Appbar.Action icon='close' onPress={() => { this.props.close(); }}/>
                                <Appbar.Content title={this.props.t('new')} subtitle={this.props.t('creationSubtitle')} />
                                <Appbar.Action icon="check" onPress={handleSubmit} disabled={isSubmitting}/>
                            </Appbar.Header>
                        </View>
                        
                        <View style={styles.gradientContainer}>
                            <LinearGradient colors={[H2HTheme.colors.primary, 'white']}>
                                <View style={{ height: 160 }}>
                                    <OrganisationProfilePicture />
                                </View>
                            </LinearGradient>
                        </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    onChangeText={handleChange('organisationName')}
                                    value={values.organisationName}
                                    error={errors.organisationName}
                                    label={this.props.t('name')} 
                                />
                                <HelperText type="error" visible={errors.organisationName}>
                                    <ErrorMessage name="organisationName" />
                                </HelperText>

                                <TextInput 
                                    multiline={true} 
                                    numberOfLines={10} 
                                    label={this.props.t('description')}
                                    onChangeText={handleChange('organisationDescription')}
                                    value={values.organisationDescription}
                                    error={errors.organisationDescription}
                                />
                        </View>
                    </View>
                    )}
                </Formik>
            </View>
        );
    }
}

export const EditOrganisationView = compose(
    graphql(mutations.CREATE_ORGANISATION, { name: 'createOrganisationMutation' }),
    graphql(mutations.UPDATE_ORGANISATION, { name: 'updateOrganisationMutation' })
)(withNamespaces(['Organisation', 'errors'])(_EditOrganisationView));
