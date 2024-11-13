import { ApiProperty } from "@nestjs/swagger";

export class ProductOrderDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    quantity: number;
}