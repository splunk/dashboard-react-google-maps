import React from 'react'
//import BaseVisualization from '@splunk/dashboard-visualizations/common/BaseVisualization'
import GoogleMap from '@splunk/google-map'
import SplunkVisualization from '@splunk/visualizations/common/SplunkVisualization'


const CustomMap = ({dataSource,width,height,background='transparent',title,description,options})=>
{
    return(<GoogleMap/>);
};

CustomMap.propTypes ={
    ...SplunkVisualization.propTypes,
};

CustomMap.defaultProps ={
    ...SplunkVisualization.defaultProps,
};

export default CustomMap;