import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entity/order.entity";
import { Repository } from "typeorm";
import { OrderResponseDto } from "./dto/order-response.dto";
import { ProductService } from "../product/product.service";
import { OrderStatus } from "./order-status.enum";
import { ProductOrderDto } from "./dto/product-order.dto";
import { UpdateProductOrderDto } from "./dto/update-product-order.dto";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class OrderService {

    private readonly TAX = 0.18;

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        private readonly productService: ProductService,
        private readonly authService: AuthService,
        ) {}

    async create(data: ProductOrderDto[]): Promise<OrderResponseDto> {
        const loggedUser = await this.authService.getLoggedUser()
        let subtotal = 0;
        const products = await Promise.all(data.map(async (productOrderDto) => {
            const product = await this.productService.findForOrder(productOrderDto.id, productOrderDto.quantity)
            subtotal += product.price * productOrderDto.quantity;
            return product;
        }))
        const tax = subtotal * this.TAX;

        const order = await this.orderRepository.save({
            products: products,
            status: OrderStatus.PENDING,
            tax,
            subtotal,
            total: subtotal + tax,
            createdAt: new Date(),
            user: loggedUser,
        })

        return this.mapOrderToResponse(order)
    }

    async findById(id: number): Promise<OrderResponseDto> {
        try {
            const loggedUser = await this.authService.getLoggedUser()
            const order = await this.orderRepository.findOneOrFail({
                where: {
                    id: id,
                    deletedAt: null,
                    user: {id: loggedUser.id},
                }
            })
            return this.mapOrderToResponse(order)
        } catch (error) {
            throw new NotFoundException('Order not found: ' + id);
        }
    }

    async findAll(): Promise<OrderResponseDto[]> {
        const loggedUser = await this.authService.getLoggedUser()
        const orders = await this.orderRepository.find({
            where: {
                deletedAt: null,
                user: {id: loggedUser.id},
            }
        })
        return orders.map(order => this.mapOrderToResponse(order))
    }

    async updateProducts(data: UpdateProductOrderDto): Promise<OrderResponseDto> {
        const order = await this.findById(data.orderId)
        
        let newSubtotal = 0;
        const products = await Promise.all(data.products.map(async (productOrderDto) => {
            const product = await this.productService.findForOrder(productOrderDto.id, productOrderDto.quantity)
            newSubtotal += product.price * productOrderDto.quantity;
            return product;
        }))
        const tax = newSubtotal * this.TAX;

        await this.orderRepository.update(
            { id: order.id }, 
            {
                products: products,
                subtotal: newSubtotal,
                total: newSubtotal + tax,
                tax,
                updatedAt: new Date(),
            }
        )
        const newOrder = await this.orderRepository.findOne({where: {id: order.id}})

        return this.mapOrderToResponse(newOrder)
    }

    private mapOrderToResponse(order: Order): OrderResponseDto {
        return {
            id: order.id,
            tax: order.tax,
            subtotal: order.subtotal,
            total: order.total,
            products: order.products.map(product => ({
                id: product.id,
                name: product.name,
                price: product.price,
            }))
        }
    }

}