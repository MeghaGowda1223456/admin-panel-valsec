const CANDIDATES_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Candidate Id',
    nummeric: false,
    disablePadding: true,
    label: 'Candidate Name',

    width: 10,
  },
  {
    dataIndex: 'col2',
    title: 'Candidate Name',
    nummeric: false,
    disablePadding: true,
    label: 'Candidate Name',

    width: 120,
  },
  {
    dataIndex: 'col3',
    title: 'Contact Number ',
    nummeric: false,
    disablePadding: true,

    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
    width: 200,
  },
  {
    dataIndex: 'col4',
    title: 'Email',
    nummeric: false,
    disablePadding: true,
    label: 'email',
    filter: 'select',
    width: 100,
  },
  // {
  //   dataIndex: "col5",
  //   title: "Address",
  //   nummeric: false,
  //   disablePadding: true,
  //   label: "Address",
  //   filter: "select",
  //   width: 100,
  // },

  {
    dataIndex: 'col5',
    title: 'Qualification',
    nummeric: false,
    disablePadding: true,
    label: 'Qualification',
    filter: 'select',
    width: 80,
  },
  // {
  //   dataIndex: 'col6',
  //   title: 'Employee Name',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Qualification',
  //   filter: 'select',
  //   width: 80,
  // },
  // {
  //   dataIndex: 'col7',
  //   title: 'Deleted',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 80,
  // },

  // {
  //   dataIndex: 'col8',
  //   title: 'active',
  //   nummeric: false,
  //   disablePadding: true,
  //   label: 'Category',
  //   filter: 'select',
  //   width: 80,
  // },
  {
    dataIndex: 'col6',
    title: 'Total Experience',
    nummeric: false,
    disablePadding: true,
    label: 'Total Experience',
    filter: 'select',
    width: 80,
  },
];

export default CANDIDATES_HEADERS;
