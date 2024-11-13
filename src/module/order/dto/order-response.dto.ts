import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus } from "../order-status.enum";
import { ProductOrderResponseDto } from "./product-order-response.dto";

export class OrderResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty({enum: OrderStatus})
    status: OrderStatus;
    @ApiProperty()
    tax: number;
    @ApiProperty()
    subtotal: number;
    @ApiProperty()
    total: number;
    @ApiProperty({type: [ProductOrderResponseDto]})
    products: ProductOrderResponseDto[];
}