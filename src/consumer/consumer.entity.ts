export class Consumer {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  password: string;

  address: string;

  constructor(consumer: Consumer) {
    this.firstName = consumer.firstName;
    this.lastName = consumer.lastName;
    this.email = consumer.email;
    this.password = consumer.password;
    this.address = consumer.address;
  }
}
