import React from "react";
import DashboardCore from "@splunk/dashboard-core";
import {
  DashboardContextProvider,
  GeoRegistry,
  GeoJsonProvider,
} from "@splunk/dashboard-context";
import SplunkThemeProvider from "@splunk/themes/SplunkThemeProvider";
import EnterpriseViewOnlyPreset from "@splunk/dashboard-presets/EnterpriseViewOnlyPreset";
import definition from "./definition.json";
import CustomMap from "./customMap";

const themeToVariant = {
  enterprise: { colorScheme: "light", family: "enterprise" },
  enterpriseDark: { colorScheme: "dark", family: "enterprise" },
  prisma: { colorScheme: "dark", family: "prisma" },
};
// use DashboardCore to render a simple dashboard

const geoRegistry = GeoRegistry.create();
geoRegistry.addDefaultProvider(new GeoJsonProvider());

const customPreset = {
  ...EnterpriseViewOnlyPreset,
  visualizations: {
    ...EnterpriseViewOnlyPreset.visualizations,
    "viz.CustomMap": CustomMap,
  },
};

const DashboardExample = () => {
  return (
    <SplunkThemeProvider {...themeToVariant.prisma}>
      <DashboardContextProvider geoRegistry={geoRegistry}>
        <DashboardCore
          width="100%"
          height="100%"
          preset={customPreset}
          definition={definition}
        />
      </DashboardContextProvider>
    </SplunkThemeProvider>
  );
};

export default DashboardExample;
