import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ResponseDto } from "src/utils/response.dto";
import { ProductDto } from "./dto/product.dto";
import { ProductResumeDto } from "./dto/product-resume.dto";
import { AuthGuard } from "@nestjs/passport";
import { CustomerGuard } from "../auth/guard/customer.guard";

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

    @Post()
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    async create(@Body() data: ProductDto): Promise<ResponseDto<ProductDto>> {
        return {
            status: 200,
            data: await this.productService.create(data),
            message: 'Product created'
        }
    }
}