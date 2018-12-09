// @flow
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text } from 'react-native';
import { DrawerItems, withNavigation, SafeAreaView, DrawerActions } from 'react-navigation';
import { ProfilePicture } from './../../profile/profilePicture/profilePicture';
import {styles} from './../../profile/viewProfile/header/headerStyle'

export const DrawerScreen = props => (
    <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <ProfilePicture style={styles.profilePicture}/>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);
