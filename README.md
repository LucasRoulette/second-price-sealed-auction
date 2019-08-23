# second-price-sealed-auction

Small nestJs server that provides a POST route to resolve an auction.

## Getting started

Install the needed modules using
```
npm install
```

And start the server using 
```
npm run start
```

## Routes

### POST /auction

Uses this DTO : 
```json
{
    "reservePrice": 100,
    "buyerBids": [
        {
            "buyerName": "A",
            "bids": [110, 130]
        },
        {
            "buyerName": "B",
            "bids": []
        },
        {
            "buyerName": "C",
            "bids": [125]
        },
        {
            "buyerName": "D",
            "bids": [105, 115, 90]
        },
        {
            "buyerName": "E",
            "bids": [132, 135, 140]
        }
    ]
}
            
```

And returns a response like this :

```json
{
    "winningPrice": 130,
    "auctionWinners": [
        "E"
    ]
}
```

## Testing

To run tests, simply use:

```
npm run test
```

And, for coverage :
```
npm run test:cov
```

## Possible improvements

For now the app returns an array of winner. Maybe this should change as it does not make that much sense.  
Depending on the main goal of the software, we could have ways to determine the winner or do it at random to be quick & fair.