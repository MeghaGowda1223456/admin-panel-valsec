// ----------------------------------------------------------------------
const user = JSON.parse(localStorage.getItem('userprofile'));

const account = {
  displayName: user ? user.name : '',
  email: user ? user.email : '',
  photoURL: '/assets/images/avatars/avatar_default.jpg',
};

export default account;
