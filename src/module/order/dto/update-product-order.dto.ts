import { ApiProperty } from "@nestjs/swagger";
import { ProductOrderDto } from "./product-order.dto";

export class UpdateProductOrderDto {
    @ApiProperty()
    orderId: number;
    @ApiProperty({type: [ProductOrderDto]})
    products: ProductOrderDto[];
}