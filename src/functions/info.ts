import Cookies from "js-cookie";

export const getInjectInfo = (type) => {
  if (typeof type !== "string") return null;
  if (process.env.REACT_APP_INJECT_COOKIE === "true") {
    return Cookies.get(type);
  } else {
    return localStorage.getItem(type);
  }
};

export const setInjectInfo = (type, value) => {
  if (typeof type !== "string") return null;
  if (process.env.REACT_APP_INJECT_COOKIE === "true") {
    Cookies.set(type, value);
  } else {
    localStorage.setItem(type, value);
  }
};

export const removeInjectInfo = (type, value) => {
  if (typeof type !== "string") return null;
  if (process.env.REACT_APP_INJECT_COOKIE === "true") {
    Cookies.remove(type, value);
  } else {
    localStorage.removeItem(type);
  }
};
