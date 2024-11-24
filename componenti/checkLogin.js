export const checkLogin = () => {
    const log = sessionStorage.getItem("mattiaLogin");
    return log == "utenteLoggato";
  }