export class CreateProductDto {
   proName:string;
   proDescrption:string;
   price:number;
   storage:string;
   color:string;
   imageUrl:string; 
   stock: number;
}

export class UpdateProductDto {
   proName?:string;
   proDescrption?:string;
   price?:number;
   storage?:string;
   color?:string;
   imageUrl?:string; 
   stock?:number;
}