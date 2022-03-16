export interface User {
  _id: string,
  username: string,
}

export interface AuthResponse {
  token: string,
  user: User,
}
