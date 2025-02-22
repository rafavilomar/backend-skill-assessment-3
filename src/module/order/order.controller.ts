import { Body, Controller, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { OrderService } from "./order.service";
import { createResponseDto, ResponseDto } from "src/utils/response.dto";
import { OrderResponseDto } from "./dto/order-response.dto";
import { ProductOrderDto } from "./dto/product-order.dto";
import { UpdateProductOrderDto } from "./dto/update-product-order.dto";
import { AuthGuard } from "@nestjs/passport";
import { CustomerGuard } from "../auth/guard/customer.guard";
import { ApiOkResponse, ApiSecurity } from "@nestjs/swagger";

@Controller('orders')
export class OrderController {

    constructor(private readonly orderService: OrderService) {}

    @Get(':id')
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiOkResponse({type: createResponseDto(OrderResponseDto)})
    async findById(@Param('id') id: number): Promise<ResponseDto<OrderResponseDto>> {
        return {
            data: await this.orderService.findById(id),
            status: 200,
            message: 'Order found',
        }
    }

    @Get()
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiOkResponse({type: createResponseDto(OrderResponseDto)})
    async findAll(): Promise<ResponseDto<OrderResponseDto[]>> {
        return {
            data: await this.orderService.findAll(),
            status: 200,
            message: 'Orders found',
        }
    }

    @Post()
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiOkResponse({type: createResponseDto(OrderResponseDto)})
    async create(@Body() data: ProductOrderDto[]): Promise<ResponseDto<OrderResponseDto>> {
        return {
            data: await this.orderService.create(data),
            status: 200,
            message: 'Order created',
        }
    }

    @Put()
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiOkResponse({type: createResponseDto(OrderResponseDto)})
    async updateProducts(@Body() data: UpdateProductOrderDto): Promise<ResponseDto<OrderResponseDto>> {
        return {
            data: await this.orderService.updateProducts(data),
            status: 200,
            message: 'Order updated',
        }
    }

    @Post('pay/:id')
    @ApiSecurity('bearer')
    @UseGuards(AuthGuard('jwt'), CustomerGuard)
    @ApiOkResponse({type: ResponseDto<void>})
    async pay(@Param('id') id: number): Promise<ResponseDto<void>> {
        await this.orderService.pay(id)
        return {
            data: null,
            status: 200,
            message: 'Order paid',
        }
    }
}