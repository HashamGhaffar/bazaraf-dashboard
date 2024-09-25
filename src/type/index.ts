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

// Order types starts
export interface Cart {
  cartId: string;
  quantity: number;
  item: Item;
  selectedModifiers: Modifier[];
  createdAt: number;
  updatedAt: number;
}

export interface OrderDiscount {
  discountId: string;
  discountType: DiscountTypes;
  discountValue: number;
}

export interface Order {
  orderId: string;
  customerId: string;
  customerPhoneNumber: string;
  completeAddress: string | null;
  instructions: string | null;
  amountWithoutDiscount: number;
  amountWithDiscount: number;
  discount: OrderDiscount;
  pickupTime: string;
  carts: Cart[];
  orderStatus: StatusType;
  paymentType: PaymentType;
  orderType: OrderType;
  createdAt: number;
  updatedAt: number;
  deliveryLocationId: string;
  restaurantId: string;
}

export enum DiscountTypes {
  FIXED_AMOUNT = "FIXED_AMOUNT",
  PERCENTAGE = "PERCENTAGE",
}

export enum PaymentType {
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PAYPAL = "PAYPAL",
  CRYPTO = "CRYPTO",
  CASH = "CASH",
  OTHER = "OTHER",
  CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
}

export enum StatusType {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
  RETURNED = "RETURNED",
}

export enum OrderType {
  DELIVERY = "DELIVERY",
  DINE_IN = "DINE_IN",
  TAKE_AWAY = "TAKE_AWAY",
  DRIVE_THRU = "DRIVE_THRU",
}

// Order types ends

// Auth types start

export enum SellerType {
  INDIVIDUAL = "INDIVIDUAL",
  BUSINESS = "BUSINESS",
}

// Auth types start
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
