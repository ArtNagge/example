// DTO
export class AuthDto {
  login: string
  password: string
}

// RO
export class AuthRo {
  accessToken: string
  refreshToken: string
}
