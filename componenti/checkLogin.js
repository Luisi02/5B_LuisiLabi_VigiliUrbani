export const checkLogin = () => {
  //Prende dal session storage la chiave mattiaLogin
    const log = sessionStorage.getItem("mattiaLogin");
    //Fa il return di log
    return log == "utenteLoggato";
  }