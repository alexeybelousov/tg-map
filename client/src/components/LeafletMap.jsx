import React, { useEffect } from 'react';

import createMap from '../utils/createMap';

const LeafletMap = ({ data }) => {
  useEffect(() => {
    createMap(data);
  }, []);

  return <div />;
};

export default LeafletMap;
