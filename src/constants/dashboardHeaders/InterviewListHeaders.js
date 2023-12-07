const INTERVIEWLIST_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Interview Id',
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
    title: 'Candidate Name',
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
    dataIndex: 'col3',
    title: 'Employer Name',
    nummeric: false,
    disablePadding: true,

    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 120,
  },
  {
    dataIndex: 'col4',
    title: 'Interview Date',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },

  {
    dataIndex: 'col5',
    title: 'Interview Start Date',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 150,
  },
  {
    dataIndex: 'col6',
    title: 'Updated at',
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

export default INTERVIEWLIST_HEADERS;
