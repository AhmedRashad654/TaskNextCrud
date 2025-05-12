export interface payloadToken {
  _id: string;
  email: string;
  name: string;
}
export interface IuserLogin {
  email: string;
  password: string;
}

export interface IuserRegister {
  name: string;
  email: string;
  password: string;
}

export interface IinformationUser {
  _id: string;
  name: string;
  email: string;
}

export interface ICreateTodo {
  title: string;
  description: string;
  isComplete: boolean;
}

export interface IinformationTodo {
  _id: string;
  title: string;
  description: string;
  userId: string;
  isComplete: boolean;
}
