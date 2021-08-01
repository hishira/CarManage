export const passwordValidate = (password, messageOpen) => {
  let warningflag = true;
  if (password === "" || password === undefined) {
    messageOpen("warning", "Enter password");
    warningflag = false;
  } else if (password.length < 6) {
    messageOpen("warning", "Password to short, min 6 characters");
    warningflag = false;
  } else if (!/(?=.*\W|_)(?=.*\d)/.test(password)) {
    messageOpen(
      "warning",
      "Password must containt at last one number or special character"
    );
    warningflag = false;
  }
  return warningflag;
};

export const emailvalidate = (email, messageOpen) => {
  let warningflag = true;
  if (email === "" || email === undefined) {
    messageOpen("warning", "Enter email");
    warningflag = false;
  }
  if (email.length > 255) {
    messageOpen("warning", "Email to long, max 255 characters");
    warningflag = false;
  }
  return warningflag;
};

const introtocompanyyearvalidation = (instodate, messageOpen) => {
  let warningflag = true;
  if (
    new Date(instodate) > new Date(Date.now()) ||
    new Date(instodate).getFullYear() < 1970
  ) {
    warningflag = false;
    messageOpen(
      "warning",
      "Invalid intro date into company, must be bettwen 1970 and now"
    );
  }
  return warningflag;
};

const caryearvalidation = (caryear, messageOpen) => {
  let warningflag = true;
  if (
    caryear === undefined ||
    caryear < 1900 ||
    caryear > new Date(Date.now()).getFullYear()
  ) {
    warningflag = false;
    messageOpen("warning", "Invalid car year");
  }
  return warningflag;
};

const actualrunvalidation = (actualrun, messageOpen) => {
  let warningflag = true;
  if (actualrun === undefined || actualrun < 0) {
    warningflag = false;
    messageOpen("warning", "Invalid actual car run");
  }
  return warningflag;
};

export const NewCarValidation = (newcar, messageOpen) => {
  if (!introtocompanyyearvalidation(newcar.companyintrodate, messageOpen))
    return false;
  if (!caryearvalidation(newcar.year, messageOpen)) return false;
  if (!actualrunvalidation(newcar.actualrun, messageOpen)) return false;
  return true;
};
