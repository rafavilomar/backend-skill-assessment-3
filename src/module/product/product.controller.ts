import { Controller, Get, Param } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseDto } from "src/utils/response.dto";
import { ProductDto } from "./dto/product.dto";
import { ProductResumeDto } from "./dto/product-resume.dto";

@Controller('api/product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<ResponseDto<ProductResumeDto[]>> {
        return {
            status: 200,
            data: await this.productService.findAll(),
            message: 'Products found'
        }
    }

    @Get(':id')
    async findById(@Param('id') id: number): Promise<ResponseDto<ProductDto>> {
        return {
            status: 200,
            data: await this.productService.findById(id),
            message: 'Product found'
        }
    }
}