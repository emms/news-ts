# Typechecking data from an external API with io-ts

This project is a super-quick tryout of io-ts in typechecking data from external APIs. It uses the News API (https://newsapi.org/) to get data about news. Running this project requires an API key to the News API, which is used here as an environment variable.

The project can be ran with npm run start. That results in the titles of the top news headlines for the US being printed on the console. In this project, io-ts helps ensure that the data fetched from an external API is in the expected format. If it is not, an error is displayed on the console instead of the result. 