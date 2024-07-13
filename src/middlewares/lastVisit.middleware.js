export const setLastVisit = (req, res, next) => {
    //if cookie is set, we will add a local var with last visit time data.
  
    if (req.cookies.lastVisit) {
      res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    } else {
      res.cookie("lastVisit", new Date().toISOString(), {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
    }
  
    next();
  };