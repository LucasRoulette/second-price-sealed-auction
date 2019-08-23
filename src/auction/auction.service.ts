import { Injectable } from '@nestjs/common';

import { AuctionResults } from './models/auction-results.class';
import { AuctionRequestDto } from './request-dto/auction-request.dto';

/**
 * Service used to handle logic on auctions
 */
@Injectable()
export class AuctionService {

    /**
     * Resolve from the route's DTO the auction's winner
     * Goes over each buyers
     * If their bids is higher than the reserve price, they are temporary the winner and their bid is the higher
     * The next buyer with a bigger highest bid becomes the new temporary winner
     * Since there can be a tie, there may be multiple winners
     */
    public resolveWinner(auctionRequestDto: AuctionRequestDto): AuctionResults {
        let auctionWinners: string[] = [];
        let highestBid: number = auctionRequestDto.reservePrice;
        let winningPrice: number = auctionRequestDto.reservePrice;

        // We go over every buyers
        auctionRequestDto.buyerBids.forEach(buyerBids => {

            // We start by getting once their highest bid
            const buyerHighestBid: number = this.getHighestBid(buyerBids.bids);

            // If their highest bid is higher than the previously seen bids, he becomes the winner
            // Their bid becomes the highest and the previous one becomes the winning price
            if (buyerHighestBid > highestBid) {
                auctionWinners = [buyerBids.buyerName];
                winningPrice = highestBid;
                highestBid = buyerHighestBid;
                return;
            }

            // If their bid is equal to the highest, we add them to the array of winners
            // I don't have a prefered way of choosing the winner if there must be only one
            if (buyerHighestBid === highestBid) {
                auctionWinners.push(buyerBids.buyerName);
                return;
            }

            // If it's not the highest bid but over the winning price, it becomes the winning price
            if (buyerHighestBid > winningPrice) {
                winningPrice = buyerHighestBid;
            }
        });

        return new AuctionResults(winningPrice, auctionWinners);
    }

    /**
     * Get the highest bid of the array
     * Ignore falsy values because JS magic consider them to equals 0
     * 0 may cause problems with negative numbers
     * Will return -infinity if the array is empty, wich is OK in this cas
     */
    private getHighestBid(bids: number[]): number {
        let highest: number = -Infinity;
        bids.forEach(b => {
            if ( (b || b === 0) && b > highest ) {
                highest = b;
            }
        });
        return highest;
    }
}
