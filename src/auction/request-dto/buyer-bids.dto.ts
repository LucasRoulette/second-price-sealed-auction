import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * DTO used to represent buyers and bids
 * buyerName is a simple string representing their name
 * bids is an array of number respresenting their bids
 */
export class BuyerBidsRequestDto {
    @IsString()
    @IsNotEmpty()
    public buyerName: string;

    @IsArray()
    @IsNumber({allowNaN: false, allowInfinity: false}, {each: true})
    public bids: number[];
}
