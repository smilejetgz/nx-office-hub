import { DashboardOutline, FormOutline } from '@ant-design/icons-angular/icons';
import { AdminModel } from '@nx-office-hub/layouts';

const menuItems: AdminModel.MenuItems[] = [
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
