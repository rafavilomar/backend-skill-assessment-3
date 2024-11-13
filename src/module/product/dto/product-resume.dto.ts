import { ApiProperty } from "@nestjs/swagger";

export class ProductResumeDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    name: string;
    @ApiProperty()
    price: number;
}