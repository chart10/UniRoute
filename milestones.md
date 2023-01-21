# Project Milestones

## Minimum Viable Product

In order for a user to get the most basic and essential functionality out of UniRoute they need to be able to perform 4 main tasks.

1. From the main page, the user should be able to enter their starting and destination addresses into a form and plan a route based on that input which will display on an interactive map along side step-by-step directions.
2. They should be able to create an account within the app and login any time.
3. They should be able to save addresses to their account for later use.
4. Using saved addresses as input (start & destination), the user should be able to generate a route to that location.

To accomplish this UniRoute will need the following features:

- Google Transit API query with user defined input parameters
- Incorporation of Georgia State University transit information into route query
- Interactive map that can visualize the query results
- Database system to store user profile and information
- The ability to read from and write to the database

## Complete Shippable Product

In order for us to feel comfortable inviting users to try our app we will need to implement the following features:

- The user should be able to create a "schedule" of starting points and destinations. From the front page the user can click a button to quickly generate a route based on the user's schedule for that day.
- The user's schedule can be used to quickly generate a week-long itinerary of routes.
- The main page will have a "news ticker" style component that will display a list of dynamicly called headlines related to weather, traffic, and public transit news
- Integrate APIs related to electronic bikes and scooters into routes so that users can optionally locate nearby vehicles during on-foot travel.
- Create a unique display for the interactive map that is visually distinct from the default Google map

## Stretch Features

If we have extra time we would like to implement the following features:

- Broaden the scope of the app to include transit API from at least one other University (e.g. Emory, Georgia Tech).
- Broaden the scope of the app to include transit API from one other University in a city besides Atlanta.

## Droppable Features

If we are behind schedule, we will need to scrap some or all of our extra stretch goals. If necessary we are also prepared to deprioritize the following features:

- E-bike/e-scooter API integration
- Interactive map redesign
- "news ticker" feature
