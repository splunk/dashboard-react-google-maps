import React from 'react';

import layout from '@splunk/react-page';
import GoogleMap from '@splunk/google-map';
import { SplunkThemeProvider } from '@splunk/themes';

import { defaultTheme, getThemeOptions } from '@splunk/splunk-utils/themes';

import { StyledContainer, StyledGreeting } from './StartStyles';

const themeProviderSettings = getThemeOptions(defaultTheme() || 'enterprise');

layout(
    <SplunkThemeProvider {...themeProviderSettings}>
        <StyledContainer>
            <StyledGreeting>Hello, from inside MapDashboard!</StyledGreeting>
            <div>Your component will appear below.</div>
            <GoogleMap name="from inside GoogleMap" />
        </StyledContainer>
    </SplunkThemeProvider>
);
