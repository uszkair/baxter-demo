export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  jwt?: string;
  roles: string[];
}
