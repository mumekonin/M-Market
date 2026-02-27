export class CreateProductDto {
   proName:string;
   proDescrption:string;
   price:number;
   storage:string;
   color:string;
   imageUrl:string; 
}

export class UpdateProductDto {
  readonly name?: string;
  readonly price?: number;
  readonly description?: string;
}