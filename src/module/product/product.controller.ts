import { Controller, Get } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseDto } from "src/utils/response.dto";
import { ProductDto } from "./dto/product.dto";

@Controller('api/product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    async findAll(): Promise<ResponseDto<ProductDto[]>> {
        return {
            status: 200,
            data: await this.productService.findAll(),
            message: 'Products found'
        }
    }
}