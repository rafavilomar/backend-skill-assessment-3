import { ProductOrderResponseDto } from "./product-order-response.dto";

export class OrderResponseDto {
    id: number;
    tax: number;
    subtotal: number;
    total: number;
    products: ProductOrderResponseDto[];
}