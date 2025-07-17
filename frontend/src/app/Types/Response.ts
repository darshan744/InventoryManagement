export type IBaseResponse<T> = {
  message: string;
  data: T;
};

export type LoginResponse = {
  user: {
    id: string;
    email: string;
  };
};
