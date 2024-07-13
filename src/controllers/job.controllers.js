import ApplicantModel from "../models/applicant.model.js";
import JobModel from "../models/job.model.js";

export default class JobController {
  getLandingPage(req, res) {
    res.render("landing-page", {
      errorMessage: null,
      success: null,
      email: req.session.email,
      name: req.session.name,
    });
  }
  getNewJob(req, res, next) {
    res.render("new-jobs", {
      errorMessage: null,
      email: req.session.email,
      name: req.session.name,
    });
  }
  getJobs(req, res, next) {
    const jobs = JobModel.getJobs();
    res.render("jobs", {
      jobs: jobs,
      email: req.session.email,
      name: req.session.name,
    });
  }
  postNewJob(req, res, next) {
    const newJob = req.body;
    JobModel.addJob(newJob);
    const jobs = JobModel.getJobs();
    res.render("jobs", {
      jobs: jobs,
      email: req.session.email,
      name: req.session.name,
    });
  }

  getViewJob(req, res, next) {
    const jobId = req.params.id;
    const jobFound = JobModel.getJobById(jobId);
    const applicants = ApplicantModel.getNoApplicants(jobId);
    if (jobFound) {
      res.render("job-details", {
        job: jobFound,
        applicants: applicants,
        email: req.session.email,
        name: req.session.name,
      });
    } else {
      res.status(401).send("Job not listed !");
    }
  }

  getUpdateViewJob(req, res, next) {
    const jobId = req.params.id;
    const jobFound = JobModel.getJobById(jobId);
    if (jobFound) {
      res.render("update-job", {
        job: jobFound,
        email: req.session.email,
        name: req.session.name,
        errorMessage: null,
      });
    } else {
      res.status(401).send("Job not listed !");
    }
  }

  postUpdateJob(req, res, next) {
    const jobId = req.params.id;
    const jobFound = JobModel.getJobById(jobId);
    if (jobFound) {
      JobModel.update(jobId, req.body);
      const jobFound = JobModel.getJobById(jobId);
      const applicant = ApplicantModel.getNoApplicants(jobId);
      res.render("job-details", {
        job: jobFound,
        applicants: applicant,
        email: req.session.email,
        name: req.session.name,
      });
    } else {
      res.status(401).send("Job not listed !");
    }
  }

  deleteJob(req, res) {
    const jobId = req.params.id;
    JobModel.deleteJob(jobId);
    res.redirect("/jobs");
  }

  getSearchJob(req, res) {
    const { search } = req.body;
    console.log(search);
    const jobFound = JobModel.search(search);

    if (jobFound) {
      const jobsArr = [jobFound];
      console.log(jobsArr);
      res.render("jobs", {
        jobs: jobsArr,
        email: req.session.email,
        name: req.session.name,
      });
    } else {
      res.status(401).send("Job not listed !");
    }
  }
}