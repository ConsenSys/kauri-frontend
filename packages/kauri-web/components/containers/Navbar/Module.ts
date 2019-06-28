const eraseCookieFromAllPaths = (name: string) => {
    // This function will attempt to remove a cookie from all paths.
  
    // do a simple pathless delete first.
    document.cookie = name + "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;";
    document.cookie =
      name +
      `=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.${
        window.location.hostname
      }`;
  };

const deleteAllCookies = (callback: any) => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      eraseCookieFromAllPaths(name);
    }
    return callback && setTimeout(() => callback(), 700);
  };
  
export const logout = () => {
    deleteAllCookies(() => {
      window.location.href = "/";
    });
  };