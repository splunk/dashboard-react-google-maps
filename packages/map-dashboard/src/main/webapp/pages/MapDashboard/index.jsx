import React from "react";
import layout from "@splunk/react-page";
import DashboardExample from "./DashboardExample";

layout(<DashboardExample />, {
  pageTitle: "Map Dashboard",
  hideFooter: true,
  layout: "fixed",
});
