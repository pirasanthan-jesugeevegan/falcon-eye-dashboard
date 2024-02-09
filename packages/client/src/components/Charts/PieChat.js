import { Box, Card, CardContent, CardHeader, Stack, SvgIcon, Typography, useTheme } from '@mui/material';
import { IconBug, IconHeadphones, IconShieldLock } from '@tabler/icons';
import ReactECharts from 'echarts-for-react';
import PropTypes from 'prop-types';

import JiraTicketSummaryCardSkeleton from 'components/Cards/Skeleton/JiraTicketSummaryCard';

const iconMap = {
  Bugs: (
    <SvgIcon>
      <IconBug />
    </SvgIcon>
  ),
  Defects: (
    <SvgIcon>
      <IconHeadphones />
    </SvgIcon>
  ),
  Security: (
    <SvgIcon>
      <IconShieldLock />
    </SvgIcon>
  )
};

export const OverviewTraffic = (props) => {
  const { chartSeries, labels, sx } = props;
  const theme = useTheme();
  const chartOptions = {
    color: [theme.palette.primary.main, theme.palette.secondary.main, theme.palette.warning.main],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        name: 'Jira Issue Type',
        type: 'pie',
        radius: ['40%', '70%'],

        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: chartSeries
      }
    ]
  };
  return (
    <>
      {chartSeries && chartSeries.every((value) => value.value === undefined) ? (
        <JiraTicketSummaryCardSkeleton />
      ) : (
        <Card sx={{ ...sx, height: '100%', boxShadow: theme.shadows[10] }}>
          <CardHeader title="Jira Ticket Summary" sx={{ padding: '14px', alignContent: 'center' }} />
          <CardContent sx={{ padding: '10px' }}>
            <ReactECharts option={chartOptions} />
            <Stack alignItems="center" direction="row" justifyContent="center" spacing={4}>
              {chartSeries.map((item, index) => {
                console.log(item);
                const label = labels[index];

                return (
                  <Box
                    key={label}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {iconMap[label]}
                    <Typography sx={{ my: 1 }} variant="h4">
                      {label}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle">
                      {item.value}
                    </Typography>
                  </Box>
                );
              })}
            </Stack>
          </CardContent>
        </Card>
      )}
    </>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object
};
