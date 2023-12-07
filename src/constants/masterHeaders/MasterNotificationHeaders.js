const MASTER_NOTIFICATIONS_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Notification Id',
    nummeric: false,
    disablePadding: true,
    label: 'SL.No',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 100,
  },
  {
    dataIndex: 'col2',
    title: 'Message',
    nummeric: false,
    disablePadding: true,

    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 120,
  },
  {
    dataIndex: 'col3',
    title: 'Template Type',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  // {
  //   dataIndex: 'col4',
  //   title: 'Transaction Date',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 100,
  // },
  {
    dataIndex: 'col4',
    title: 'User Id',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },

  {
    dataIndex: 'col5',
    title: 'User Type',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
  {
    dataIndex: 'col6',
    title: 'Actions',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
];

export default MASTER_NOTIFICATIONS_HEADERS;
