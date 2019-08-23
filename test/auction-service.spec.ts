import { AuctionService } from '../src/auction/auction.service';
import { AuctionResults } from '../src/auction/models/auction-results.class';
import { AuctionRequestDto } from '../src/auction/request-dto/auction-request.dto';

describe('AuctionService', () => {
    let auctionService: AuctionService;

    beforeEach(() => {
        auctionService = new AuctionService();
    });

    describe('resolveAuction', () => {
        it('Return the winner with basic values', () => {
            const auctionRequestDto: AuctionRequestDto = {
                reservePrice: 100,
                buyerBids: [
                    {
                        buyerName: 'A',
                        bids: [110, 130],
                    },
                    {
                        buyerName: 'B',
                        bids: [],
                    },
                    {
                        buyerName: 'C',
                        bids: [125],
                    },
                    {
                        buyerName: 'D',
                        bids: [105, 115, 90],
                    },
                    {
                        buyerName: 'E',
                        bids: [132, 135, 140],
                    },
                ],
            };

            const result: AuctionResults = {
                winningPrice: 130,
                auctionWinners: [
                    'E',
                ],
            };

            expect(auctionService.resolveWinner(auctionRequestDto)).toEqual(result);
        });

        it('Return the winner with negative values', () => {
            const auctionRequestDto: AuctionRequestDto = {
                reservePrice: -45,
                buyerBids: [
                    {
                        buyerName: 'A',
                        bids: [-10],
                    },
                    {
                        buyerName: 'B',
                        bids: [-255],
                    },
                    {
                        buyerName: 'C',
                        bids: [0],
                    },
                ],
            };

            const result: AuctionResults = {
                winningPrice: -10,
                auctionWinners: [
                    'C',
                ],
            };

            expect(auctionService.resolveWinner(auctionRequestDto)).toEqual(result);
        });

        it('Return the winner with null values', () => {
            const auctionRequestDto: AuctionRequestDto = {
                reservePrice: 50,
                buyerBids: [
                    {
                        buyerName: 'A',
                        bids: [null, undefined],
                    },
                    {
                        buyerName: 'B',
                        bids: [51],
                    },
                    {
                        buyerName: 'C',
                        bids: [NaN],
                    },
                    {
                        buyerName: 'D',
                        bids: [-Infinity],
                    },
                ],
            };

            const result: AuctionResults = {
                winningPrice: 50,
                auctionWinners: [
                    'B',
                ],
            };

            expect(auctionService.resolveWinner(auctionRequestDto)).toEqual(result);
        });

        it('Handle multiple winners', () => {
            const auctionRequestDto: AuctionRequestDto = {
                reservePrice: 50,
                buyerBids: [
                    {
                        buyerName: 'A',
                        bids: [12, 52],
                    },
                    {
                        buyerName: 'B',
                        bids: [52],
                    },
                    {
                        buyerName: 'C',
                        bids: [51],
                    },
                ],
            };

            const result: AuctionResults = {
                winningPrice: 51,
                auctionWinners: [
                    'A',
                    'B',
                ],
            };

            expect(auctionService.resolveWinner(auctionRequestDto)).toEqual(result);
        });

    });
});
