export enum Roles {
  ROLE = 1 << 0,
}

export const hasRole = (userRoles: string, role?: Roles) =>
  role ? ((userRoles as unknown as Roles) & role) === role : true
