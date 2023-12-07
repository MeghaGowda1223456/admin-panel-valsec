const SETTINGS_HEADERS = [
  {
    dataIndex: 'col1',
    title: ' Matching Criteria Id',
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
    title: 'Matching Criteria Type',
    nummeric: false,
    disablePadding: true,

    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 100,
  },
  {
    dataIndex: 'col3',
    title: 'value',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 60,
  },

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

export default SETTINGS_HEADERS;
