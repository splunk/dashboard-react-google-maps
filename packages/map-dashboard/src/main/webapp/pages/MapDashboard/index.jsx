import React from 'react';
import layout from '@splunk/react-page';
import DashboardCore from '@splunk/dashboard-core';
import { DashboardContextProvider } from '@splunk/dashboard-context';
import definition from './definition.json';
import GeoRegistry from '@splunk/dashboard-context/GeoRegistry';
import GeoJsonProvider from '@splunk/dashboard-context/GeoJsonProvider';
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import EnterpriseViewOnlyPreset from '@splunk/dashboard-presets/EnterpriseViewOnlyPreset';
import CustomMap from './customMap';






const themeToVariant = {
    enterprise: { colorScheme: 'light', family: 'enterprise' },
    enterpriseDark: { colorScheme: 'dark', family: 'enterprise' },
    prisma: { colorScheme: 'dark', family: 'prisma' },
};
// use DashboardCore to render a simple dashboard

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());


const customPreset = {
    ...EnterpriseViewOnlyPreset,
    visualizations:{
        ...EnterpriseViewOnlyPreset.visualizations,
        'viz.CustomMap':CustomMap,
    }
}


layout(
    <SplunkThemeProvider {...themeToVariant.prisma}>
        <DashboardContextProvider geoRegistry={geoRegistry}>
            <DashboardCore
                width="100%"
                height="100%"
                preset={customPreset}
                definition={definition}
            />
        </DashboardContextProvider>
    </SplunkThemeProvider>,

    {
        pageTitle: 'Map Dashboard',
        hideFooter: true,
        layout: 'fixed',
    }
);