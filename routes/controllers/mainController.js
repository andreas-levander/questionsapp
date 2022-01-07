const showMain = ({ render, user }) => {
  if(user) {
    render("main.eta", {user: user.id});
  } else {
    render("main.eta");
  }
};

export { showMain };
