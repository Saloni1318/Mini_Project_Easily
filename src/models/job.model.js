export default class JobModel {
    constructor(
      id,
      jobCategory,
      jobDesignation,
      jobLocation,
      companyName,
      salary,
      applyBy,
      skillsReq,
      numberOfOpenings
    ) {
      this.id = id;
      this.jobCategory = jobCategory;
      this.jobDesignation = jobDesignation;
      this.jobLocation = jobLocation;
      this.companyName = companyName;
      this.salary = salary;
      this.applyBy = applyBy;
      this.skillsReq = [];
      if (typeof skillsReq === "string") {
        this.skillsReq.push(skillsReq);
      } else {
        this.skillsReq.push(...skillsReq);
      }
  
      this.numberOfOpenings = numberOfOpenings;
    }
  
    static addJob(job) {
      const id = jobs.length + 1;
      const {
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        applyBy,
        skillsReq,
        numberOfOpenings,
      } = job;
  
      const newJob = new JobModel(
        id,
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        applyBy,
        skillsReq,
        numberOfOpenings
      );
      jobs.push(newJob);
      console.log(jobs);
    }
  
    static deleteJob(id) {
      const index = jobs.findIndex((j) => {
        return j.id == id;
      });
  
      jobs.splice(index, 1);
    }
  
    static getJobs() {
      return jobs;
    }
  
    static getJobById(jobId) {
      const jobFound = jobs.find((j) => {
        if (j.id == jobId) {
          return j;
        }
      });
  
      return jobFound;
    }
  
    static update(jobId, newJobObj) {
      const index = jobs.findIndex((j) => {
        return j.id == jobId;
      });
  
      const {
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        applyBy,
        skillsReq,
        numberOfOpenings,
      } = newJobObj;
  
      const updatedJob = new JobModel(
        jobId,
        jobCategory,
        jobDesignation,
        jobLocation,
        companyName,
        salary,
        applyBy,
        skillsReq,
        numberOfOpenings
      );
  
      jobs[index] = updatedJob;
      console.log(jobs[index]);
    }
  
    static search(job) {
      const jobFound = jobs.find((j) => {
        const lenOfWord = job.length;
        if (
          job.toLowerCase() == j.companyName.slice(0, lenOfWord).toLowerCase()
        ) {
          return j;
        } else if (
          job.toLowerCase() == j.jobCategory.slice(0, lenOfWord).toLowerCase()
        ) {
          return j;
        } else if (
          job.toLowerCase() == j.jobDesignation.slice(0, lenOfWord).toLowerCase()
        ) {
          return j;
        } else if (
          job.toLowerCase() == j.jobLocation.slice(0, lenOfWord).toLowerCase()
        ) {
          return j;
        }
      });
  
      console.log(jobFound);
  
      return jobFound;
    }
  }
  
  let jobs = [
    new JobModel(
      1,
      "Tech",
      "FrontEnd Developer",
      "Sonipat",
      "Saloni Group of Company.",
      "2400000",
      "2024-02-03",
      ["Node", "JS"],
      "1"
    ),
  ];