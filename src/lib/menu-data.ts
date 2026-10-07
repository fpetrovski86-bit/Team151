export type MenuItem = {
  name: string;
  desc: string;
  price: number;
  img: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};
