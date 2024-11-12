import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, IsNull, Repository, MoreThan, MoreThanOrEqual } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "./dto/product.dto";
import { ProductResumeDto } from "./dto/product-resume.dto";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async findAll(): Promise<ProductResumeDto[]> {
        const products = await this.productRepository.find({
            where: {
                deletedAt: IsNull(),
            }
        });
        return products.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
        }))
    }

    async findById(id: number): Promise<ProductDto> {
        try {
            const product = await this.productRepository.findOneOrFail({
                where: {
                    id: id,
                    deletedAt: IsNull(),
                }
            });
            return {
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock
            }
        } catch (error) {
            throw new NotFoundException('Product not found: ' + id);
        }
    }

    async findForOrder(id: number, quantity: number): Promise<ProductDto> {
        const product = await this.findById(id)
        if (product.stock < quantity) {
            throw new Error('Not enough stock for this product: ' + product.id + ', quantity: ' + quantity)
        }
        return product
    }

    async create(data: ProductDto): Promise<ProductDto> {
        const product = await this.productRepository.save({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            createdAt: new Date(),
        });
        return {...data, id: product.id}
    }

    async update(id: number, data: Partial<ProductDto>): Promise<ProductDto> {
        const oldProduct = await this.findById(id)
        await this.productRepository.update(
            { id: oldProduct.id }, 
            {...data, updatedAt: new Date()}
        )
        return {
            id: oldProduct.id,
            name: oldProduct.name,
            description: oldProduct.description,
            price: oldProduct.price,
            stock: oldProduct.stock,
            ...data
        }
    }

    async delete(id: number): Promise<void> {
        await this.findById(id)
        await this.productRepository.update({id}, {deletedAt: new Date()})
    }
}