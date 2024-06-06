import { ProductType, CombinedProductType } from "./drizzle/schema";

declare global {
  type GlobalProductType = ProductType;
  type CombinedProductType = CombinedProductType;
}
