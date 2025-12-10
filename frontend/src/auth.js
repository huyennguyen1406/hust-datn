const TOKEN_STORAGE = "auth_token";

export function isAuthenticated() {
  return !!localStorage.getItem(TOKEN_STORAGE);
}

export function login() {
  localStorage.setItem(TOKEN_STORAGE, "mock_token");
}

export function logout() {
  localStorage.removeItem(TOKEN_STORAGE);
}
