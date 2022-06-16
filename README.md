# Currency-Convertor

- Simple API for currency conversion.

- Uses Exchange Rates Data API service to fetch rates between different currencies.
 
- Store these rates to the application MongoDB, so we don't have to use the service which has a limited free requests number each time we receive a request from a client.

- Update the database every six hours from the service with the fluctuations in rates.

- Build an API that takes two currencies and the amount the client wants to convert and returns the result.

