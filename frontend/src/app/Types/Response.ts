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

export type UnitType = 'PCS' | 'KG' | 'LITERS' | 'BOX' | 'OTHER';
export const UnitTypes: UnitType[] = ['PCS', 'KG', 'LITERS', 'BOX', 'OTHER'];
export type ProductResponse = {
  id: string;
  name: string;
  quantity: number;
  threshold: number;
  unit: UnitType;
  category: string | null;
  lastRestocked: Date;
  userId: string;
};
