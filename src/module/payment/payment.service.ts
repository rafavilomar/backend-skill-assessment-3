import { Injectable, Logger } from "@nestjs/common";
import { OrderResponseDto } from "../order/dto/order-response.dto";

@Injectable()
export class PaymentService {
    private readonly logger = new Logger(PaymentService.name);

    async pay(order: OrderResponseDto): Promise<void> {
        this.logger.log('Payment successfully made')
    }
}