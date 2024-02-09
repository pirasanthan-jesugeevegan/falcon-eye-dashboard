import commonAxios from './Common';

export async function getJira(issueType) {
  try {
    const req = await commonAxios.get(`/rest/api/2/search?jql=project=PRODENG AND type="${issueType}" AND status not in (Done)`);
    return req.data;
  } catch (error) {
    console.error('Error fetching Jira data:', error);
    throw error;
  }
}
