export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Sports',
  'Books',
  'Toys',
  'Beauty',
  'Health',
  'Automotive',
  'Jewelry',
  'Art',
  'Music',
  'Movies',
  'Food',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];
