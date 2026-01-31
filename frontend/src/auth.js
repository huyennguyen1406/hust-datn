const TOKEN_STORAGE = "store_access_token";

export function isAuthenticated() {
  return localStorage.getItem(TOKEN_STORAGE);
}

export function logout() {
  localStorage.removeItem(TOKEN_STORAGE);
  localStorage.removeItem("store_refresh_token");
}
