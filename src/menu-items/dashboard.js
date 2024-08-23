// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconTransactionRupee  , IconCreditCard , IconShadow, IconWindmill, IconFriends  } from '@tabler/icons-react';
// constant
const icons = { 
  IconDashboard,
  IconTransactionRupee,
  IconCreditCard,
  IconShadow,
  IconWindmill,
  IconFriends 
 };

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [
    {
      id: 'default',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard/default',
      icon: icons.IconDashboard,
      breadcrumbs: false
    },
    {
      id: 'util-Transactions',
      title: 'Transactions',
      type: 'item',
      url: '/utils/util-transactions',
      icon: icons.IconTransactionRupee,
      breadcrumbs: false
    },
    {
      id: 'util-color',
      title: 'Cards',
      type: 'item',
      url: '/utils/util-cards',
      icon: icons.IconCreditCard ,
      breadcrumbs: false
    },
    // {
    //   id: 'util-shadow',
    //   title: 'Shadow',
    //   type: 'item',
    //   url: '/utils/util-shadow',
    //   icon: icons.IconShadow,
    //   breadcrumbs: false
    // },
    {
      id: 'util-beneficiary',
      title: 'Beneficiaries',
      type: 'item',
      url: '/utils/util-beneficiary',
      icon: icons.IconFriends,
      breadcrumbs: false
    }
  ]
};

export default dashboard;
