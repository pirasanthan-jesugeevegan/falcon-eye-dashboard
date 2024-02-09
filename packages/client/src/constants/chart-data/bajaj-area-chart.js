const generateChartData = (testResults) => {
  return {
    type: 'area',
    height: 95,
    options: {
      chart: {
        id: 'support-chart',
        sparkline: {
          enabled: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: 'Test Passes'
        },
        marker: {
          show: false
        }
      }
    },
    series: [
      {
        data: testResults.map((result) => result.pass - result.fail)
      }
    ]
  };
};

export default generateChartData;
