import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "./product.entity";
import { ProductDto } from "./dto/product.dto";

@Injectable()
export class ProductService {

    constructor(@InjectRepository(Product) private readonly productRepository: Repository<Product>) {}

    async findAll(): Promise<ProductDto[]> {
        const products = await this.productRepository.find({
            where: {
                deletedAt: null
            }
        });
        return products.map(product => ({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        }))
    }
}