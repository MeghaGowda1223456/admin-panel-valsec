const EMPLOYEE_HEADERS = [
  {
    dataIndex: 'col1',
    title: 'Employer Id',
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
    dataIndex: 'col3',
    title: 'Email',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  {
    dataIndex: 'col4',
    title: 'Contact Number',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 100,
  },
  // {
  //   dataIndex: "col5",
  //   title: "Deleted",
  //   nummeric: false,
  //   disablePadding: true,
  //   label: "Category",
  //   filter: "select",
  //   width: 80,
  // },

  {
    dataIndex: 'col5',
    title: 'Is Active',
    nummeric: false,
    disablePadding: true,
    label: 'Category',
    filter: 'select',
    width: 80,
  },
];

export default EMPLOYEE_HEADERS;
