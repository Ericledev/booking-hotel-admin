export const diffDate = (fromDate, toDate) => {
  const fromD = new Date(fromDate);
  const toD = new Date(toDate);
  return (toD - fromD) / (1000 * 24 * 60 * 60);
};

export const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};

export const isNumber = (dataStr) => {
  const numberArr = dataStr.split(";");
  for (let i = 0; i < numberArr.length; i++) {
    if (
      isNaN(numberArr[i]) ||
      +numberArr[i] < 0 ||
      numberArr[i].substring(0, 1) === "0"
    ) {
      return false;
    }
  }
  return true;
};
export const isEmptyArrRef = (dataInput) => {
  for (let i = 0; i < dataInput.length; i++) {
    if (dataInput[i].current.value.trim() === "") {
      dataInput[i].current.focus();
      return true;
    }
  }
  return false;
};
export const isSameName = (dataStr) => {
  const numberArr = dataStr.split(";");
  for (let i = 0; i < numberArr.length - 1; i++) {
    for (let j = i + 1; j < numberArr.length; j++) {
      if (numberArr[i] === numberArr[j]) return true;
    }
  }
  return false;
};

export const isEmail = (emailInput) => {
  if (
    !emailInput.includes("@") ||
    !emailInput.includes(".") ||
    emailInput.includes(" ")
  )
    return false;
  const emailArr = emailInput.split("@");
  // check name is correct or not
  if (emailArr.length > 2) return false; // email there are two parts(name & domain) are seperated by "@"
  const name = emailArr[0];
  if (name === "") return false;
  // check domain is correct or not
  const domain = emailArr[1];
  if (!domain.includes(".")) return false;
  const subDomain = domain.split(".");
  for (let i = 0; i < subDomain.length; i++) {
    if (subDomain[i] === "") return false;
  }
  return true;
};
