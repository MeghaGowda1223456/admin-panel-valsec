const MASTER_BUSSINESS_HEADERS = [
  // {
  //   dataIndex: 'col1',
  //   title: 'Business Id',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'SL.No',
  //   sorter: {
  //     compare: (a, b) => a.math - b.math,
  //     multiple: 2,
  //   },
  //   width: 100,
  // },
  {
    dataIndex: 'col1',
    title: 'Business Name',
    nummeric: false,
    disablePadding: true,

    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 120,
  },
  {
    dataIndex: 'col2',
    title: 'City',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  {
    dataIndex: 'col3',
    title: 'Post Code',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  {
    dataIndex: 'col4',
    title: 'Business Email',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 70,
  },

  {
    dataIndex: 'col5',
    title: 'Cra Number',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
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

export default MASTER_BUSSINESS_HEADERS;
