import { body, validationResult } from "express-validator";
const validateRequest = async (req, res, next) => {
  //validate data

  //setup rules for validation.
  const rules = [
    body("jobCategory").custom((value, { req }) => {
      if (value == "select job category") {
        throw new Error("Select job category");
      }
      return true;
    }),
    body("jobDesignation").custom((value, { req }) => {
      if (value == "select job designation") {
        throw new Error("Select job designation");
      }
      return true;
    }),
    body("jobLocation").notEmpty().withMessage("Job Location can't be empty"),
    body("companyName").notEmpty().withMessage("Company Name can't be empty"),
    body("salary")
      .isFloat({ gt: 0 })
      .withMessage("Salary must be a positive value"),
    body("numberOfOpenings")
      .isFloat({ gt: 0 })
      .withMessage("No. of Openings must be a valid number"),
    body("skillsReq").custom((value, { req }) => {
      if (value == "select skills required for this job") {
        throw new Error("Select skills required for this job");
      }
      return true;
    }),
    body("applyBy").isISO8601().toDate().withMessage("Invalid apply by date"),
    //body("imageUrl").isURL().withMessage("Invalid URL !"),
  ];

  //run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  //check for errors after running the rules.
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.render("new-job", {
      errorMessage: validationErrors.array()[0].msg,
      email: req.session.email,
      name: req.session.name,
    });
  }

  next();
};

const validateRegisterUser = async (req, res, next) => {
  //validate data

  //setup rules for validation.
  const rules = [
    body("name").notEmpty().withMessage("Name is required !"),
    body("email").notEmpty().withMessage("Email is required !"),
    body("password").notEmpty().withMessage("Set a unique password"),
  ];

  //run those rules.
  await Promise.all(rules.map((rule) => rule.run(req)));

  //check for errors after running the rules.
  let validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.render("landing-page", {
      errorMessage: validationErrors.array()[0].msg,
      success: null,
    });
  }

  next();
};

export { validateRequest, validateRegisterUser };