import JobModel from "../models/job.model.js";
import UserModel from "../models/user.model.js";

export default class UserController {
  postRegisterUser(req, res) {
    const newUser = req.body;
    UserModel.addUser(newUser);
    res.render("landing-page", { errorMessage: null, success: true });
  }

  postLoginUser(req, res) {
    const { email, password } = req.body;
    const isValidUser = UserModel.isValidUser(email, password);
    console.log(isValidUser);
    if (isValidUser) {
      const { name } = isValidUser;
      req.session.email = email;
      req.session.name = name;
      const jobs = JobModel.getJobs();
      res.render("jobs", {
        jobs: jobs,
        email: req.session.email,
        name: req.session.name,
      });
    } else {
      res.render("landing-page", {
        errorMessage: "Invalid Credentials",
        success: null,
      });
    }
  }

  getLogout(req, res) {
    req.session.destroy((error) => {
      if (error) console.log(error);
      else res.redirect("/");
    });
    //res.clearCookie("lastVisit");
  }
}