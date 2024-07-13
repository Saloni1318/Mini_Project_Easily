import ApplicantModel from "../models/applicant.model.js";
import JobModel from "../models/job.model.js";

export default class ApplicantController {
  postApplicantApply(req, res) {
    const jobId = req.params.id;
    const { name, email, contact } = req.body;
    const resume = "resumes/" + req.file.filename;
    const jobFound = JobModel.getJobById(jobId);

    if (jobFound) {
      ApplicantModel.add(jobId, name, email, contact, resume);
    } else {
      res.status(401).send("Applicant not listed !");
    }

    let jobs = JobModel.getJobs();
    return res.render("jobs", { jobs: jobs });
  }

  getApplicants(req, res) {
    const jobId = req.params.id;
    const applicantsFound = ApplicantModel.getApplicants(jobId);
    if (applicantsFound) {
      res.render("applicants", { applicants: applicantsFound });
    } else {
      res.redirect("/jobs");
    }
  }
}