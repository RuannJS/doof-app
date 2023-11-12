export class Owner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  restaurants?: Restaurant[];
}

// TEMPORARY RESTAURANT

class Restaurant {
  id: string;
  name: string;
}
