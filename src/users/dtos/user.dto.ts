import { Expose } from 'class-transformer'; // Expose means share this property, Exclude means do share this property.
export class UserDto {
    @Expose()
    id: number;
    @Expose()
    email: string; 
}