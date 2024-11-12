import { ProductOrderDto } from "./product-order.dto";

export class UpdateProductOrderDto {
    orderId: number;
    products: ProductOrderDto[];
}