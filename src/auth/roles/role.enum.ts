export enum Role {
  Employee = 1 << 0,
  Partner = 1 << 1,
  Manager = 1 << 2,
  Admin = Employee | Partner | Manager,
}
