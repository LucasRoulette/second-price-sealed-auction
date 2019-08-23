import { AuctionController } from '../src/auction/auction.controller';
import { AuctionService } from '../src/auction/auction.service';
import { AuctionResults } from '../src/auction/models/auction-results.class';
import { AuctionRequestDto } from '../src/auction/request-dto/auction-request.dto';

describe('AuctionService', () => {
    let auctionController: AuctionController;
    let auctionService: AuctionService;

    beforeEach(() => {
        auctionService = new AuctionService();
        auctionController = new AuctionController(auctionService);
    });

    describe('postAuction', () => {
        it('Return the resolved auction', async () => {
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

            jest.spyOn(auctionService, 'resolveWinner').mockImplementation(() => result);

            expect(await auctionController.postAuction(auctionRequestDto)).toEqual(result);
        });
    });
});
