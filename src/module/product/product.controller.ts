import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ProductService } from "./product.service";
import { createResponseDto, ResponseDto } from "src/utils/response.dto";
import { ProductDto } from "./dto/product.dto";
import { ProductResumeDto } from "./dto/product-resume.dto";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "../auth/guard/admin.guard";
import { ApiOkResponse, ApiSecurity } from "@nestjs/swagger";


@Controller('api/product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOkResponse({type: createResponseDto(ProductResumeDto)})
    async findAll(): Promise<ResponseDto<ProductResumeDto[]>> {
        return {
            status: 200,
            data: await this.productService.findAll(),
            message: 'Products found'
        }
    }

    @Get(':id')
    @ApiOkResponse({type: createResponseDto(ProductDto)})
    async findById(@Param('id') id: number): Promise<ResponseDto<ProductDto>> {
        return {
            status: 200,
            data: await this.productService.findById(id),
            message: 'Product found'
        }
    }

    @Post()
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiOkResponse({type: createResponseDto(ProductDto)})
    async create(@Body() data: ProductDto): Promise<ResponseDto<ProductDto>> {
        return {
            status: 200,
            data: await this.productService.create(data),
            message: 'Product created'
        }
    }

    @Put(':id')
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiOkResponse({type: createResponseDto(ProductDto)})
    async update(@Param('id') id: number, @Body() data: Partial<ProductDto>): Promise<ResponseDto<ProductDto>> {
        return {
            status: 200,
            data: await this.productService.update(id, data),
            message: 'Product updated'
        }
    }

    @Delete(':id')
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), AdminGuard)
    @ApiOkResponse({type: ResponseDto<void>})
    async delete(@Param('id') id: number): Promise<ResponseDto<void>> {
        await this.productService.delete(id)
        return {
            status: 200,
            data: null,
            message: 'Product deleted'
        }
    }
}