import { Injectable } from "@nestjs/common";
import { AuctionRequestDto } from "./request-dto/auction-request.dto";
import { AuctionResults } from "./models/auction-results.class";

/**
 * Service used to handle logic on auctions
 */
@Injectable()
export class AuctionService{

    /**
     * Resolve from the route's DTO the auction's winner
     * Goes over each buyers
     * If their bids is higher than the reserve price, they are temporary the winner and their bid is the higher
     * The next buyer with a bigger highest bid becomes the new temporary winner
     * Since there can be a tie, there may be multiple winners
     */
    public resolveWinner(auctionRequestDto: AuctionRequestDto): AuctionResults{
        let auctionWinners: string[] = [];
        let highestBid: number = auctionRequestDto.reservePrice;
        let winningPrice: number = auctionRequestDto.reservePrice;

        // We go over every buyers
        auctionRequestDto.buyerBids.forEach(buyerBids => {

            // We start by getting once their highest bid
            const buyerHighestBid: number = this.getHighestBid(buyerBids.bids);

            // If their highest bid is higher than the previously seen bids, he becomes the winner
            // Their bid becomes the highest and the previous one becomes the winning price
            if(buyerHighestBid > highestBid){
                auctionWinners = [buyerBids.buyerName];
                winningPrice = highestBid;
                highestBid = buyerHighestBid;
                return;
            }

            // If their bid is equal to the highest, i thought that they would win as well
            // So we add them to the array of winners
            if(buyerHighestBid === highestBid){
                auctionWinners.push(buyerBids.buyerName);
            }
        })

        return new AuctionResults(winningPrice, auctionWinners);
    }

    /**
     * Basic function that returns the highest bid of the array
     * Used to be custom made but spreading in Math.max seems more efficient
     * @param bids 
     */
    private getHighestBid(bids: number[]): number{
        if(! bids || bids.length === 0){
            return null;
        }
        return Math.max(...bids);
    }
}