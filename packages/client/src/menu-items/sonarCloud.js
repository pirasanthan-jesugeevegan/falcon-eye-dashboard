import { IconGitPullRequest } from '@tabler/icons';

const sonarCloud = {
  id: 'sonarCloud',
  title: 'Sonar Cloud',
  type: 'group',
  children: [
    {
      id: 'sonarCloud-pull-request',
      title: 'Pull Request',
      type: 'collapse',
      icon: IconGitPullRequest,
      children: [
        {
          id: 'coincover-b2b2c',
          title: 'coincover-b2b2c',
          type: 'item',
          url: '/sonarCloud-pull-request/coincover-b2b2c',
          breadcrumbs: false
        },
        {
          id: 'coincover-txm',
          title: 'coincover-txm',
          type: 'item',
          url: '/sonarCloud-pull-request/coincover-txm',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default sonarCloud;
