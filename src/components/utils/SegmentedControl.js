// @flow
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { H2HTheme } from '../../../themes/default.theme';

export const SegmentedControl = (props: any) => {
    return (
        <SegmentedControlTab
            activeTabStyle={{
                backgroundColor: H2HTheme.colors.primary,
            }}
            tabTextStyle={{
                color: H2HTheme.colors.primary,
            }}
            {...props}

        />
    );
};
