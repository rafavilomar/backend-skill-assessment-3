import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entity/order.entity";
import { Repository } from "typeorm";
import { OrderResponseDto } from "./dto/order-response.dto";
import { ProductService } from "../product/product.service";
import { OrderStatus } from "./order-status.enum";
import { ProductOrderDto } from "./dto/product-order.dto";
import { UpdateProductOrderDto } from "./dto/update-product-order.dto";
import { AuthService } from "../auth/auth.service";
import { ProductOrder } from "./entity/product-order.entity";
import { Product } from "../product/product.entity";
import { PaymentService } from "../payment/payment.service";

@Injectable()
export class OrderService {

    private readonly TAX = 0.18;

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        @InjectRepository(ProductOrder) private readonly productOrderRepository: Repository<ProductOrder>,
        private readonly productService: ProductService,
        private readonly authService: AuthService,
        private readonly paymentService: PaymentService,
        ) {}

    async create(data: ProductOrderDto[]): Promise<OrderResponseDto> {
        const loggedUser = await this.authService.getLoggedUser()
        const products = await this.getProductOrders(data)

        const subtotal = products.reduce((acc, productOrder) => acc + productOrder.subtotal, 0);
        const tax = subtotal * this.TAX;

        const order = await this.orderRepository.save({
            status: OrderStatus.PENDING,
            tax,
            subtotal,
            total: subtotal + tax,
            createdAt: new Date(),
            user: loggedUser,
        })
        await this.productOrderRepository.save(
            products.map(product => ({
                ...product,
                order: order,
            }))
        )

        return this.mapOrderToResponse(order)
    }

    private async getProductOrders(data: ProductOrderDto[]): Promise<ProductOrder[]> {
        const productOrders: ProductOrder[] = []
        for (const productOrderDto of data) {
            const product = await this.productService.findForOrder(productOrderDto.id, productOrderDto.quantity)
            productOrders.push({
                id: null,
                order: null,
                product: {id: product.id} as Product,
                quantity: productOrderDto.quantity,
                subtotal: product.price * productOrderDto.quantity,
            })
        }
        return productOrders
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
        const products = await this.getProductOrders(data.products)

        const newSubtotal = products.reduce((acc, productOrder) => acc + productOrder.subtotal, 0);
        const tax = newSubtotal * this.TAX;

        await Promise.all([
            this.orderRepository.update(
                { id: order.id }, 
                {
                    subtotal: newSubtotal,
                    total: newSubtotal + tax,
                    tax,
                    updatedAt: new Date(),
                }
            ),
            this.productOrderRepository.delete({order})
        ])
        
        const [newOrder] = await Promise.all([
            this.orderRepository.findOne({where: {id: order.id}}),
            this.productOrderRepository.save(
                products.map(product => ({
                    ...product,
                    order: order,
                }))
            )
        ])

        return this.mapOrderToResponse(newOrder)
    }

    async pay(orderId: number): Promise<void> {
        const order = await this.findById(orderId)
        if (order.status !== OrderStatus.PENDING) {
            throw new BadRequestException('Order is not pending')
        }

        let orderPaid = false
        try {
            await this.paymentService.pay(order)
            orderPaid = true
            await this.handleProductsStock(order.products)
            await this.orderRepository.update({id: order.id}, {status: OrderStatus.COMPLETED})
        } catch (error) {
            if (orderPaid) {
                await this.orderRepository.update({id: order.id}, {status: OrderStatus.PENDING})
            }
            throw error
        }
    }

    private async handleProductsStock(productsOrder: ProductOrderDto[]): Promise<void> {
        const productsProcessed: ProductOrderDto[] = []

        try {
            for (const productOrder of productsOrder) {
                await this.productService.reduceStock(productOrder.id, productOrder.quantity)
                productsProcessed.push(productOrder)
            }
        } catch (error) {
            await Promise.all(productsProcessed.map(productOrder => this.productService.restoreStock(productOrder.id, productOrder.quantity)))
            throw error
        }
    }

    private mapOrderToResponse(order: Order): OrderResponseDto {
        return {
            id: order.id,
            tax: order.tax,
            status: order.status,
            subtotal: order.subtotal,
            total: order.total,
            products: order.productOrders.map(productOrder => ({
                id: productOrder.product.id,
                name: productOrder.product.name,
                price: productOrder.product.price,
                quantity: productOrder.quantity,
            }))
        }
    }

}