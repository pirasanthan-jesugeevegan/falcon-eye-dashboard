import { useEffect, useState } from 'react';

import FingerprintIcon from '@mui/icons-material/Fingerprint';
import SupportIcon from '@mui/icons-material/Support';
import { Grid } from '@mui/material';
import { IconBug, IconHeadphones, IconShieldLock, IconTicket } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';

// import { OverviewTraffic } from 'components/Charts/PieChat';
// import TotalOrderLineChartCard from '../components/Cards/TotalOrderLineChartCard';
// import TotalGrowthBarChart from '../components/Cards/TotalGrowthBarChart';

import { getProjectStatusData } from '../api/get-sonar-cloud-data';
import { getE2eTotalTest } from '../api/get-test-data';
// import BajajAreaChartCard from '../components/Cards/BajajAreaChartCard';
import PopularCard from '../components/Cards/E2ETestStatusCard';
import LargeCard from '../components/Cards/LargeCard';
import SmallCard from '../components/Cards/SmallCard';
import { gridSpacing } from '../redux/constants';
import { getJiraBugData, getJiraDefectData, getJiraSecurityData } from '../redux/selectors';
import { retrieveJiraData } from '../redux/thunks/jira';

const Dashboard = () => {
  const dispatch = useDispatch();

  const jiraBugData = useSelector(getJiraBugData);
  const jiraDefectData = useSelector(getJiraDefectData);
  const jiraSecurityData = useSelector(getJiraSecurityData);

  const [bug, setBug] = useState(jiraBugData);
  const [defect, setDefect] = useState(jiraDefectData);
  const [security, setSecurity] = useState(jiraSecurityData);

  const [data, setData] = useState([]);
  const [b2b2cSonarCloudStatusData, setB2b2cSonarCloudStatusData] = useState([]);
  const [txmSonarCloudStatusData, setTxmSonarCloudStatusData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    const fetchData = async () => {
      try {
        const result = await getE2eTotalTest();

        if (!jiraBugData || jiraBugData.length === 0) {
          setBug(await dispatch(retrieveJiraData('bug')));
        }
        if (!jiraDefectData || jiraDefectData.length === 0) {
          setDefect(await dispatch(retrieveJiraData('customer defect')));
        }

        if (!jiraSecurityData || jiraSecurityData.length === 0) {
          setSecurity(await dispatch(retrieveJiraData('security issue')));
        }

        const b2b2cSonarCloudStatus = await getProjectStatusData('coincover_coincover-b2b2c');
        const txmSonarCloudStatus = await getProjectStatusData('coincover_coincover-txm');

        setData(result);

        setB2b2cSonarCloudStatusData(b2b2cSonarCloudStatus);
        setTxmSonarCloudStatusData(txmSonarCloudStatus);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch, jiraBugData, jiraDefectData, jiraSecurityData]);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Grid sx={{ padding: '8px' }}>
              <LargeCard
                isLoading={isLoading}
                title={data.totalTests}
                subtitle="Total E2E Tests"
                icon={IconTicket}
                backgroundColor="primary"
              />
            </Grid>
            <Grid sx={{ padding: '8px' }}>
              <LargeCard
                isLoading={isLoading}
                title={`${bug?.total} Bugs`}
                subtitle="Total Number of open Defects"
                icon={IconBug}
                backgroundColor="secondary"
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            <Grid sx={{ padding: '8px' }}>
              <LargeCard
                isLoading={isLoading}
                title={`${defect?.total} Defects`}
                subtitle="Total Number of open Defect"
                icon={IconHeadphones}
                backgroundColor="secondary"
              />
            </Grid>
            <Grid sx={{ padding: '8px' }}>
              <LargeCard
                isLoading={isLoading}
                title={`${security?.total} Security Issue`}
                subtitle="Total Number of open Security Issues"
                icon={IconShieldLock}
                backgroundColor="primary"
              />
            </Grid>
          </Grid>
          <Grid item lg={4} md={6} sm={12} xs={12}>
            {/* <Grid sx={{ padding: '8px' }}>
              <OverviewTraffic
                chartSeries={[bug?.total, defect?.total, security?.total]}
                labels={['Bugs', 'Defects', 'Security']}
                sx={{ height: '100%' }}
              />
            </Grid> */}

            <Grid sx={{ padding: '8px' }}>
              <SmallCard
                isLoading={isLoading}
                title="coincover-b2b2c"
                subtitle="SonarCloud"
                result={b2b2cSonarCloudStatusData.projectStatus?.status}
                icon={<FingerprintIcon fontSize="inherit" />}
              />
            </Grid>
            <Grid sx={{ padding: '8px' }}>
              <SmallCard
                isLoading={isLoading}
                title="coincover-txm"
                subtitle="SonarCloud"
                result={txmSonarCloudStatusData.projectStatus?.status}
                icon={<SupportIcon fontSize="inherit" />}
              />
            </Grid>
            <Grid sx={{ padding: '8px' }}>
              <PopularCard isLoading={isLoading} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
