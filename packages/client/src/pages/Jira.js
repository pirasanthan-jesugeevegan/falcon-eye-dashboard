// material-ui
import { useEffect, useState } from 'react';

import { Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

// project imports
import MainCard from 'components/Cards/MainCard';

import JiraTable from '../components/Tables/JiraTable';
import { gridSpacing } from '../redux/constants';
import { getJiraBugData, getJiraDefectData, getJiraSecurityData } from '../redux/selectors';
import { retrieveJiraData } from '../redux/thunks/jira';

const Products = ({ title }) => {
  const jiraBugData = useSelector(getJiraBugData);
  const jiraDefectData = useSelector(getJiraDefectData);
  const jiraSecurityData = useSelector(getJiraSecurityData);

  const [bug, setBug] = useState(jiraBugData);
  const [defect, setDefect] = useState(jiraDefectData);
  const [security, setSecurity] = useState(jiraSecurityData);

  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (!jiraBugData || jiraBugData.length === 0) {
          setBug(await dispatch(retrieveJiraData('bug')));
        }
        if (!jiraDefectData || jiraDefectData.length === 0) {
          setDefect(await dispatch(retrieveJiraData('customer defect')));
        }

        if (!jiraSecurityData || jiraSecurityData.length === 0) {
          setSecurity(await dispatch(retrieveJiraData('security issue')));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, jiraBugData, jiraDefectData, jiraSecurityData]);

  useEffect(() => {
    if (title === 'Bugs') setData(bug || []);
    if (title === 'Defects') setData(defect || []);
    if (title === 'Securitys') setData(security || []);
  }, [bug, defect, security, title]);

  return (
    <>
      {data?.issues?.length > 0 ? (
        <MainCard title={`List of Open ${title} issues`} sx={{ boxShadow: theme.shadows[6] }}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  {isLoading ? <div>Loading...</div> : <JiraTable data={data.issues} />}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      ) : (
        <MainCard sx={{ boxShadow: theme.shadows[6] }}>
          <Typography sx={{ textAlign: 'center' }}>No Data</Typography>
        </MainCard>
      )}
    </>
  );
};

Products.propTypes = {
  title: PropTypes.string
};

export default Products;
