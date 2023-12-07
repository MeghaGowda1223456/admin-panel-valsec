// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Employers',
    path: '/dashboard/employers',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'Interviews',
  //   path: '/dashboard/interviews',
  //   icon: icon('ic_cart'),
  // },
  {
    title: 'Store Managers',
    path: '/dashboard/storemanager',
    icon: icon('ic_blog'),
  },
  {
    title: 'Candidates',
    path: '/dashboard/candidates',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Job Posts',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Payroll',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Masters',
    // No path for the "Masters" itself, as it will be a dropdown.
    icon: icon('ic_lock'),
    subheader: 'Master', // This is the section header for the dropdown.
    hasSubmenu: true,
    items: [
      {
        title: 'Masters Business',
        path: '/dashboard/business',
      },
      {
        title: 'Masters Cities',
        path: '/dashboard/cityes',
      },
      {
        title: 'Masters Notification',
        path: '/dashboard/notification',
      },
      {
        title: 'Masters Stores',
        path: '/dashboard/stores',
      },
      {
        title: 'Masters Jobs',
        path: '/dashboard/jobs',
      },
      {
        title: 'Masters Industries',
        path: '/dashboard/industries',
      },
      // Add more submenu items as needed...
    ],
  },
  // {
  //   title: 'Masters',
  //   path: '/dashboard/masters',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   subheader: 'Master', // This is the section header.
  //   items: [
  //     {
  //       title: 'Submenu Item 1',
  //       path: '/master/submenu1',
  //     },
  //     {
  //       title: 'Submenu Item 2',
  //       path: '/master/submenu2',
  //     },
  //     // Add more submenu items as needed...
  //   ],
  // },
  {
    title: 'Settings',
    path: '/dashboard/settings',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
