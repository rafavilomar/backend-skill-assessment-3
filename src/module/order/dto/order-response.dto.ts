import { OrderStatus } from "../order-status.enum";
import { ProductOrderResponseDto } from "./product-order-response.dto";

export class OrderResponseDto {
    id: number;
    status: OrderStatus;
    tax: number;
    subtotal: number;
    total: number;
    products: ProductOrderResponseDto[];
}