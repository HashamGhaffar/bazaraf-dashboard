export interface IRating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRating;
}
export interface IProductsState {
  products: IProduct[];
  loading?: boolean;
  error?: string;
}
export interface AuthState {
  user: any;
  refreshToken: string | null;
  accessToken: string | null;
  restaurant: any;
  industry: any;
}
export type RootState = {
  auth: AuthState;
};

export interface Address {
  addressId: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface RestaurantInterface {
  name: string;
  slogan: string;
  licenseNumber: string;
  address: Address;
  openingHours: string;
  phoneNumber: string;
  hasDineIn: boolean;
  hasDriveThru: boolean;
  hasTakeAway: boolean;
  hasDelivery: boolean;
  deliveryTime: string;
  imageUrl: string;
  brandImageUrl: string;
  brandColor: string;
}
export interface RestaurantUpdateInterface {
  length: number;
  restaurantId?: string;
  userId?: string;
  name: string;
  slogan: string;
  address: Address;
  openingHours: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
  qrUrl?: string;
  hasDineIn: boolean;
  hasDriveThru: boolean;
  hasTakeAway: boolean;
  hasDelivery: boolean;
  deliveryTime: string;
  licenseNumber?: string;
  imageUrl: string;
  brandImageUrl: string;
  brandColor: string;
}
export interface AuthState {
  user: any;
  refreshToken: string | null;
  accessToken: string | null;
  restaurant: any;
  industry: any;
}

interface Cart {
  quantity: number;
}

export interface Order {
  customerId: string;
  restaurantId: string;
  orderStatus: "PENDING";
  paymentType: "CREDIT_CARD";
  orderType: "DELIVERY";
  carts: Cart[];
  pickupTime: string;
  deliveryLocationId: string;
}

export interface Address {
  addressId: string;
  city: string;
  postalCode: string;
  address: string;
}

export interface RestaurantInterface {
  name: string;
  slogan: string;
  licenseNumber: string;
  address: Address;
  openingHours: string;
  phoneNumber: string;
  hasDineIn: boolean;
  hasDriveThru: boolean;
  hasTakeAway: boolean;
  hasDelivery: boolean;
  deliveryTime: string;
  imageUrl: string;
  brandImageUrl: string;
  brandColor: string;
}
export interface RestaurantUpdateInterface {
  restaurantId?: string;
  userId?: string;
  name: string;
  slogan: string;
  address: Address;
  openingHours: string;
  phoneNumber: string;
  createdAt?: string;
  updatedAt?: string;
  qrUrl?: string;
  hasDineIn: boolean;
  hasDriveThru: boolean;
  hasTakeAway: boolean;
  hasDelivery: boolean;
  deliveryTime: string;
  licenseNumber?: string;
  imageUrl: string;
  brandImageUrl: string;
  brandColor: string;
}

export interface Table {
  tableId: string;
  restaurantId: string;
  tableNumber: string;
  seatCapacity: number;
  isReserved: boolean;
  location?: string;
  features?: string;
  qrUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CategoryFormData {
  name?: string;
  description?: string;
  imageUrl?: string;
  categoryId?: string;
}
export interface LogoObject {
  uri: string;
}

export interface ModifierFormData {
  name: string;
  description: string;
  priceChange: string | number;
  imageUrl?: string;
  modifierId?: string;
}
export interface MenuItem {
  categoryId: string;
  description: string;
  imageUrl: string;
  itemId: string;
  itemStatus: string;
  modifierList: string[];
  name: string;
  price: number;
  restaurantId: string;
  category: Category;
  modifiersId: string[];
}

export interface Address {
  address: string;
  addressId: string;
  city: string;
  postalCode: string;
}

export interface Modifier {
  description: string;
  imageUrl: string;
  modifierId: string;
  name: string;
  priceChange: number | string;
  restaurant: Restaurant;
}

export type ModifierIdOnly = { modifierId: string };

export interface Restaurant {
  address: Address;
  brandColor: string;
  brandImageUrl: string;
  createdAt: Date | number | null;
  deliveryTime: string;
  hasDelivery: boolean;
  hasDineIn: boolean;
  hasDriveThru: boolean;
  hasTakeAway: boolean;
  name: string;
  openingHours: null | string;
  phoneNumber: string;
  qrUrl: string;
  restaurantId: string;
  slogan: string;
  updatedAt: Date | number | null;
}

export interface Category {
  categoryId: string;
  createdAt: Date | number | null;
  description: string;
  imageUrl: string;
  name: string;
  restaurant: Restaurant;
  updatedAt: Date | number | null;
  areaName?: string;
}

export interface DeliveryLocationInterface {
  areaName: string;
  deliveryLocationId?: string;
  city: string;
  minimumOrder: number;
  deliveryFee: number;
  storeNextBy?: string;
  restaurantId?: string;
  locationId?: string;
  storeNearby?: string;
}

// export interface Item {

export interface Item {
  itemId?: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryId?: string | null;
  modifiers: null;
  itemStatus: string;
  createdAt: number;
  updatedAt: number | null;
  category?: Category;
  modifierList?: ModifierList[];
  modifiersId?: string[];
}

// }

export interface Errors {
  name: string;
  description: string;
}

export interface ItemFormData {
  modifierListId: any;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  modifiersId?: string;
  itemStatus: string;
  imageUrl: string;
  itemId?: string;
}

export interface ModifierListFormData {
  modifierListId: any;
  name: string;
  description?: string;
  modifiers?: Modifier[];
  minQuantity?: number;
  maxQuantity?: number;
  isRequired?: boolean;
  imageUrl?: string;
}

export interface ModifierList {
  description: string;
  imageUrl: string;
  isRequired: boolean | null;
  maxQuantity: number;
  minQuantity: number;
  modifierListId: string;
  modifiers: Modifier[]; // Replace 'Modifier' with the actual type
  name: string;
  restaurant: Restaurant;
}

export interface Theme {
  backgroundColor: string;
  backgroundImageUrl: string;
  createdAt: number;
  fontSize: number;
  isActive: boolean;
  isDefault: boolean;
  linkColor: string;
  name: string;
  primaryColor: string;
  primaryFont: string;
  primaryLogo: string;
  restaurantId: string;
  secondaryColor: string;
  secondaryFont: string;
  secondaryLogo: string;
  textColor: string;
  themeId: string;
  updatedAt: number;
}

export interface Discount {
  discountId: string;
  name: string;
  description: string;
  discountType: "PERCENTAGE" | "FIXED_AMOUNT";
  discountValue: number;
  minimumOrderAmount: number;
  startDate: number | null;
  endDate: number | null;
  isActive: boolean;
  createdAt?: number;
  updatedAt?: number;
}
