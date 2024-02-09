import * as yup from 'yup';

const DATE_REGEX: RegExp =
  /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])_(0\d|1\d|2[0-3]):([0-5]\d):([0-5]\d))$/;

const createUnitSchema = yup
  .object({
    date: yup
      .string()
      .matches(DATE_REGEX, 'date must be in the format YYYY-MM-DD_HH:MM:SS'),
    percentage: yup.string().required(),
    commit: yup.string().required(),
    pull_request: yup.string().required(),
    statement_coverage: yup.string().required(),
    function_coverage: yup.string().required(),
    branch_coverage: yup.string().required(),
    line_coverage: yup.string().required(),
    author: yup.string().required(),
  })
  .required();

export default createUnitSchema;
