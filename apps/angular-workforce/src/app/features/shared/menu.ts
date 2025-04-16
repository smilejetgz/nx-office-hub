import { DashboardOutline, FormOutline } from '@ant-design/icons-angular/icons';
import { MenuItems } from '@nx-office-hub/ui';

const menuItems: MenuItems[] = [
  {
    name: 'dashborad',
    icon: DashboardOutline,
    childrens: [
      {
        name: 'welcome',
        url: '/welcome',
      },
      {
        name: 'monitor',
        url: '/monitor',
      },
    ],
  },
  {
    name: 'customers',
    icon: FormOutline,
    childrens: [
      {
        name: 'welcome',
        url: '/cutomers',
      },
    ],
  },
];

export default menuItems;
