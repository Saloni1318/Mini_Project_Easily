import express from "express";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import JobController from "./src/controllers/job.controllers.js";
import uploadFile from "./src/middlewares/resume-upload.middleware.js";
import ApplicantController from "./src/controllers/applicant.controllers.js";
import UserController from "./src/controllers/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import {
  validateRegisterUser,
  validateRequest,
} from "./src/middlewares/validation.middleware.js";

import { sendMail } from "./src/middlewares/email.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const server = express();

server.set("view engine", "ejs");
server.set("views", path.join(path.resolve(), "src", "views"));
server.use(express.urlencoded({ extended: true }));
server.use(ejsLayouts);
server.use(express.static("public"));
server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

server.use(cookieParser());

const jobController = new JobController();
server.get("/jobs", jobController.getJobs);
server.get("/newjob", auth, jobController.getNewJob);
server.get("/", jobController.getLandingPage);
server.get("/jobs/:id", jobController.getViewJob);
server.post("/jobs", auth, validateRequest, jobController.postNewJob);
server.get("/jobs/:id/update", auth, jobController.getUpdateViewJob);
server.post("/jobs/:id/update", auth, jobController.postUpdateJob);
server.post("/delete/:id", auth, jobController.deleteJob);
server.post("/search", jobController.getSearchJob);

const applicantController = new ApplicantController();
server.post(
  "/apply/:id",
  uploadFile.single("resume"),
  sendMail,
  applicantController.postApplicantApply
);

server.get("/jobs/:id/applicants", auth, applicantController.getApplicants);

const userController = new UserController();
server.post("/register", validateRegisterUser, userController.postRegisterUser);
server.post("/login", setLastVisit, userController.postLoginUser);
server.get("/logout", userController.getLogout);

export { server };
