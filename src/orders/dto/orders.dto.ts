import { IsEnum, IsString } from 'class-validator';
import { OrderStatus } from 'src/commons/enums';
export class UpdateStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
export class orderDto{
  @IsString()
  address:string;
}