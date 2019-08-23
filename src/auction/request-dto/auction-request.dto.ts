import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';

import { BuyerBidsRequestDto } from './buyer-bids.dto';

/**
 * DTO representing an auction
 * reservePrice is the reserve price of the auction
 * buyerBids represents the buyers and their bids
 */
export class AuctionRequestDto {
    @IsNumber()
    @IsNotEmpty()
    public reservePrice: number;

    @IsArray()
    @Type(() => BuyerBidsRequestDto)
    @ValidateNested({each: true})
    public buyerBids: BuyerBidsRequestDto[];
}
