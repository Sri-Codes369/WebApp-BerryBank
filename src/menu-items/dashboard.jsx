// assets
import { IconDashboard } from '@tabler/icons-react';
import { IconTransactionRupee, IconCreditCard, IconUsers, IconWindmill, IconReportMoney, IconFriends } from '@tabler/icons-react';
import AuthService from 'services/AuthService'; // Import AuthService

// constant
const icons = { 
  IconDashboard,
  IconTransactionRupee,
  IconCreditCard,
  IconUsers,
  IconWindmill,
  IconFriends,
  IconReportMoney
};

// Function to get menu items based on roleId
const getMenuItems = (roleId) => {
  
  const commonItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      url: '/dashboard',
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
      icon: icons.IconCreditCard,
      breadcrumbs: false
    }
  ];

  const roleBasedItems = roleId === 1
    ? [
        {
          id: 'util-users',
          title: 'Users',
          type: 'item',
          url: '/utils/util-users',
          icon: icons.IconUsers,
          breadcrumbs: false
        }
      ]
    : roleId === 2
    ? [
        {
          id: 'util-beneficiary',
          title: 'Beneficiaries',
          type: 'item',
          url: '/utils/util-beneficiary',
          icon: icons.IconFriends,
          breadcrumbs: false
        }
      ]
    : []; // If roleId is neither 1 nor 2, no role-based items

  return {
    id: 'dashboard',
    title: '',
    type: 'group',
    children: [
      ...commonItems,
      ...roleBasedItems,
      {
        id: 'util-accounts',
        title: 'Accounts',
        type: 'item',
        url: '/utils/util-accounts',
        icon: icons.IconReportMoney,
        breadcrumbs: false
      }
    ]
  };
};

// Fetch the user's roleId and generate the menu items
const userFromToken = AuthService.getUserFromToken();
const roleId = userFromToken ? userFromToken.roleId : null;

// Generate the menu items only if roleId is valid
const dashboard = getMenuItems(roleId || 0); // Set a default roleId (0 or whatever is appropriate)

// Export dashboard
export default dashboard;
