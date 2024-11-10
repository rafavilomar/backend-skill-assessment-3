import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "./dto/product.dto";
import { ProductResumeDto } from "./dto/product-resume.dto";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async findAll(): Promise<ProductResumeDto[]> {
        const products = await this.productRepository.find({
            where: {
                deletedAt: null
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
            const product = await this.productRepository.findOne({
                where: {
                    id: id,
                    deletedAt: null
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
            throw new NotFoundException('Product not found');
        }
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
            {...data, id: oldProduct.id}
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
}