declare namespace App {
  interface Locals {
    currentUser: {
      id: number;
      name: string;
      email: string;
      role: string;
    } | null;
  }
}
