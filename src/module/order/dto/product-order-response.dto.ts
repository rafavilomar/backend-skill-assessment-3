import { ApiProperty } from "@nestjs/swagger";

export class ProductOrderResponseDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    quantity: number;
}