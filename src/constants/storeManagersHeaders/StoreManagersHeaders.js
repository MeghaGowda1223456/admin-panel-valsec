const STOREMANAGER_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'StoreManager Id',
    nummeric: false,
    disablePadding: true,
    label: 'StoreManager Id',
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 100,
  },
  {
    dataIndex: 'col2',
    title: 'Manager Name',
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
    title: 'Email',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 50,
  },
  {
    dataIndex: 'col4',
    title: 'Contact Number',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
  {
    dataIndex: 'col5',
    title: 'Employer Name',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
  // {
  //   dataIndex: 'col6',
  //   title: 'Deleted',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 80,
  // },

  {
    dataIndex: 'col6',
    title: 'Is Active',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
];

export default STOREMANAGER_HEADERS;
