// @flow
import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { _HidableTabBar } from '../hidableTabBar';
import { H2HOrganisationTheme } from '../../../../themes/organisation.theme';

class _OrganisationNavigatorThemed extends _HidableTabBar {
    componentDidMount() {
        super.componentDidMount();
        this.setState({ theme: H2HOrganisationTheme });
    }
}

export const createOrganisationNavigatorThemed = (routeConfig: any, drawConfig: any) => {
    const newConfig = Object.assign({}, drawConfig, { tabBarComponent: _OrganisationNavigatorThemed });
    return createBottomTabNavigator(routeConfig, newConfig);
};
