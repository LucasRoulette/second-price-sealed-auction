import { Body, Controller, Post } from '@nestjs/common';

import { AuctionService } from './auction.service';
import { AuctionResults } from './models/auction-results.class';
import { AuctionRequestDto } from './request-dto/auction-request.dto';

/**
 * Controller of the auctions
 */
@Controller('/auction')
export class AuctionController {

    constructor(
        private readonly auctionService: AuctionService,
    ) {}

    /**
     * Resolve the auction sent
     */
    @Post()
    public async postAuction(
        @Body() auctionRequestDto: AuctionRequestDto,
    ): Promise<AuctionResults> {
        try {
            return this.auctionService.resolveWinner(auctionRequestDto);
        } catch (error) {
            throw error;
        }
    }
}
