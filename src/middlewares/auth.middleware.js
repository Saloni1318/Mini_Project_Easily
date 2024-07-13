const auth = (req, res, next) => {
    if (req.session.email) {
      next();
    } else {
      return res.render("landing-page", {
        errorMessage: "You must Login first",
        success: null,
      });
    }
  };
  
  export { auth };