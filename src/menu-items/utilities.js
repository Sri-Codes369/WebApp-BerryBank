// assets
import { IconTransactionRupee  , IconCreditCard , IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconTransactionRupee,
  IconCreditCard,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
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
    {
      id: 'util-shadow',
      title: 'Shadow',
      type: 'item',
      url: '/utils/util-shadow',
      icon: icons.IconShadow,
      breadcrumbs: false
    }
  ]
};

export default utilities;
