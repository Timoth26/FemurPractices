const IsLoggedIn = () => {
  let email = localStorage.getItem("email");

  return email ? email : false;
};

export default IsLoggedIn;
