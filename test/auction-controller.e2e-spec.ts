import { ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { AuctionModule } from '../src/auction/auction.module';
import { AuctionRequestDto } from '../src/auction/request-dto/auction-request.dto';

describe('AuctionController (e2e)', () => {
  let app;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, AuctionModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/ (POST) sends bad request without payload', () => {
    return request(app.getHttpServer())
      .post('/auction')
      .expect(400);
  });

  it('/ (POST) sends back a winner', () => {
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

    return request(app.getHttpServer())
      .post('/auction')
      .send(auctionRequestDto)
      .expect(201);
  });
});
