const MASTER_STORE_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Store Id',
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
    title: 'Business Id',
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
    title: 'City',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  {
    dataIndex: 'col4',
    title: 'User Type',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  {
    dataIndex: 'col5',
    title: 'Province',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },

  {
    dataIndex: 'col6',
    title: 'Approval Status',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
  {
    dataIndex: 'col7',
    title: 'Actions',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
];

export default MASTER_STORE_HEADERS;
