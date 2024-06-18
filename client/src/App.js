import React, { useEffect, useState } from 'react';
import { useHttp } from './hooks/http.hook';
import './index.css';

import Filters from './components/Filters';
import LeafletMap from './components/LeafletMap';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '90vh',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function App() {
  const classes = useStyles();

  const { loading, error, request } = useHttp();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await request('/api/map/data');
       
        setData(data);
      } catch (error) {}
    }

    fetchData();
  }, []);

  if (!data || loading) {
    return <div className={classes.root}>
      <CircularProgress />
    </div>
  }

  if (error) {
    return `${error}`;
  }

  return (
    <>
      <Filters data={data} />
      <LeafletMap data={data} />
    </>
  );
}