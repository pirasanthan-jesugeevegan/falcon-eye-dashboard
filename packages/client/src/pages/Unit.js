import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// import SmallCard from '../components/Cards/SmallCard';
import MainCard from 'components/Cards/MainCard';

import UnitTestDataTable from '../components/Tables/UnitTestDataTable';
import { gridSpacing } from '../redux/constants';
import { getProductUnitData } from '../redux/selectors';
import { retrieveUnitData } from '../redux/thunks/product';
import { getApiByName } from '../utils/product-name-converter';

const UNIT = ({ title }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const unitData = useSelector(getProductUnitData(getApiByName(title)));

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (!unitData) {
          dispatch(retrieveUnitData(getApiByName(title)));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, unitData, title]);

  return (
    <MainCard title={`Unit Code Coverage: ${title}`} sx={{ boxShadow: theme.shadows[6] }}>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            {/* <Grid item sm={6} xs={12} md={6} lg={4}>
              <SmallCard
                isLoading={isLoading}
                title="Latest UNIT Run"
                subtitle="Status on the latest run"
                result={percentageData}
                icon={<FingerprintIcon fontSize="inherit" />}
                backgroundColor="primary"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6} lg={4}>
              <SmallCard
                isLoading={isLoading}
                title="Latest Unit Test Run"
                subtitle="Code Coverage"
                result="90%"
                icon={<FingerprintIcon fontSize="inherit" />}
                backgroundColor="secondary"
              />
            </Grid>
            <Grid item sm={6} xs={12} md={6} lg={4}>
              <SmallCard
                isLoading={isLoading}
                title="Latest SonarQube Run"
                subtitle="Code Scan"
                result="90%"
                icon={<FingerprintIcon fontSize="inherit" />}
              />
            </Grid> */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              {isLoading ? <div>Loading...</div> : <UnitTestDataTable data={unitData.data} />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

UNIT.propTypes = {
  title: PropTypes.string
};

export default UNIT;
