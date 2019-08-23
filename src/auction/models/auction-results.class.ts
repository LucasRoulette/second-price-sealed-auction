/**
 * Represents the result of an auction
 * winningPrice is the winningPrice
 * auctionWinners is an array with the names of the winners
 */
export class AuctionResults {

    constructor(winningPrice: number, auctionWinners: string[]) {
        this.winningPrice = winningPrice;
        this.auctionWinners = auctionWinners;
    }

    public winningPrice: number;
    public auctionWinners: string[];
}
