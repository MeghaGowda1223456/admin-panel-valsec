const MASTER_INDUSTRY_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Industry Id',
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
    title: 'Industry Name',
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
    title: 'Updated At',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  // {
  //   dataIndex: 'col4',
  //   title: 'User Id',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 100,
  // },
  // {
  //   dataIndex: 'col5',
  //   title: 'User Type',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 80,
  // },

  {
    dataIndex: 'col4',
    title: 'Actions',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
];

export default MASTER_INDUSTRY_HEADERS;
