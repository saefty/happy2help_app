// @flow
import * as React from 'react';
import { ScrollView } from 'react-native';
import { DrawerItems, SafeAreaView } from 'react-navigation';
import { ProfilePicture } from './../../profile/profilePicture/profilePicture';
import { styles } from './../../profile/viewProfile/header/headerStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { H2HTheme } from '../../../../themes/default.theme';
import { qrStyle } from './qr.style';
import { LogoutButton } from '../../profile/viewProfile/logoutButton/logoutButton';
import { LogOutProvider } from '../../../../App';

export const DrawerScreen = (props: any) => (
    <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
            <ProfilePicture style={styles.profilePicture} />
            <Icon
                style={qrStyle}
                color={H2HTheme.colors.primary}
                onPress={() => {
                    props.navigation.navigate('MyQRCode');
                }}
                name="qrcode-scan"
                size={60}
            />
            <DrawerItems {...props} />
            <LogOutProvider.Consumer>{value => <LogoutButton logOut={value.logOut} />}</LogOutProvider.Consumer>
        </SafeAreaView>
    </ScrollView>
);
