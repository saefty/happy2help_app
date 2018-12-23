// @flow
import React, { Component } from 'react';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import { segmentStyle } from './segmented.style';
import { View } from 'react-native';

export const SegmentedControl = (props: any) => {
    return (
        <View style={[segmentStyle.list]}>
            <SegmentedControlTab
                tabsContainerStyle={segmentStyle.tabsContainerStyle}
                tabStyle={segmentStyle.tabStyle}
                activeTabStyle={segmentStyle.activeTabStyle}
                tabTextStyle={segmentStyle.tabTextStyle}
                activeTabTextStyle={segmentStyle.activeTabTextStyle}
                borderRadius={0}
                {...props}
            />
        </View>
    );
};
