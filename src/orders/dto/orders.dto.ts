import { IsEnum } from 'class-validator';
import { OrderStatus } from 'src/commons/enums';
export class UpdateStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}