# Follow the steps below to set up the project

## Configure the .env file

## Run all import seeders
`users:import`
`icons:import`
`colors:import`
`wallets:import`
`categories:import`
`currencies:import`
`positions:import`

## Run the job
`calculate_wallet_balance:execute`

## Run the cron jobs by vising `localhost:5001/cron/*`
`syncFiatExchangeRates`
`syncCryptoExchangeRates`
`syncStockRates`
`syncPortfolio`