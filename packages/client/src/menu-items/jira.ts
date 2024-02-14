import { IconBug, IconHeadphones, IconShieldLock } from '@tabler/icons';

const unit = {
  id: 'jira',
  title: 'Jira Tracker',
  type: 'group',
  children: [
    {
      id: 'jira-bug',
      title: 'Bugs',
      type: 'item',
      url: '/jira/bug',
      icon: IconBug,
      breadcrumbs: false
    },
    {
      id: 'jira-defect',
      title: 'Defects',
      type: 'item',
      url: '/jira/defect',
      icon: IconHeadphones,
      breadcrumbs: false
    },
    {
      id: 'jira-security',
      title: 'Securitys',
      type: 'item',
      url: '/jira/security',
      icon: IconShieldLock,
      breadcrumbs: false
    }
  ]
};

export default unit;
