import { ApiProperty } from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty({required: false})
    id?: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    price: number;
    @ApiProperty()
    stock: number;
}