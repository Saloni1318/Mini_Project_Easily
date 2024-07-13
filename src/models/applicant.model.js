export default class ApplicantModel {
    constructor(jobId, id, name, email, contact, resume) {
      if (!applicants[jobId]) {
        applicants[jobId] = [];
      }
  
      this.id = id;
      this.name = name;
      this.email = email;
      this.contact = contact;
      this.resume = resume;
    }
  
    static add(jobId, name, email, contact, resume) {
      const newApplicant = new ApplicantModel(
        jobId,
        name.slice(0, 4) + email.slice(0, 4) + jobId,
        name,
        email,
        contact,
        resume
      );
  
      applicants[jobId].push(newApplicant);
  
      console.log(applicants);
    }
  
    static getApplicants(jobId) {
      if (applicants[jobId]) {
        return applicants[jobId];
      }
      return null;
    }
  
    static getNoApplicants(jobId) {
      if (applicants[jobId]) {
        return applicants[jobId].length;
      }
      return 0;
    }
  }
  
  let applicants = {};