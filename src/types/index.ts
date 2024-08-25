export type MenuItem = {
    id: string;
    outletId: string;
    name: string;
    price: number;
    description: string;
    image: any;
  };

  export type Outlet = {
    id: string;
    name: string;
    description: string;
    image: any;
  };

  export type OutletDetail = {
    id: string;
    outlet: Outlet,
    menuItems: MenuItem[]
  };

  export type PromoItem = {
    id: string;
    name: string;
    image: string;
    // descriptiom: string;
    // outletId?: string;
    // menuItemId?: string;
  };

  export type CartItem = {
    id: string;
    menuItem: MenuItem;
    totalPrice: any;
    quantity: number;
  };

  export type SearchItem = {
    id: string;
    menuItem?: MenuItem;
    outlet?: Outlet;
  };

  export type ResponseData<T> = {
    data?: T;
    statusCode: number;
    error?: string;
  };
  