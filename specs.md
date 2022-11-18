1. Introduction
   1.1 Purpose

   The purpose of UniRoute is to provide an simple one stop app to generate routes based on public transit, given starting point, destination, and arrival time.

   Note: this refers to the purpose of this document, not the system you're building.
   1.2 Intended Audience\*

   Note: this refers to the intended audience of this document, not the system you're building. You don't actually have project managers, so the audience might just be yourselves and the instructor.
   1.3 Intended Use

   Note: this refers to the intended use of this document, not the system you're building. Think about how this document will factor into your team's workflow as you develop the product. Will it inform the roadmap? Will you use it to measure success/completion of the project?
   1.4 Scope

   This is essentially a quick tl;dr of the product and the need for it. You should describe all major parts of the architecture, all types of users and their use cases, and how your offering is different from existing systems.
   1.5 Definitions and Acronyms

2. Overall Description
   2.1 User Needs
   User Stories:

   1. The user can enter a starting point and destination to get an immediate route without leaving the home page. Acceptance criteria:
      - Interactive map on home page
      - Input forms must be available that pass the addresses and/or times needed to fulfill the request
      - The necessary API query needs to be made to determine the ideal route
      - The query will return a display of the route on the interactive map and a step-by-step breakdown of the route.
   2. A display above the map will show weather, traffic and accessibility alerts that could affect user commutes.
      - The user can select to receive notification via message of current weather, traffic, and accessibility alerts.
      - The app will make a request from the Weather API, Marta public transport API, and University public transport API and it will query and return the current weather and traffic.
      - The user will receive alerts on current traffic from public transportation and university transportation.
      - Requests need to be made to fill a scroll bar with current headlines related to weather and traffic headlines in the city.
   3. From the homepage the user can specify their preferred mode of transportation (transit, car, walk, e-scooter).
      - The routing algorithm should take into account user selected settings regarding transportation the method.
      - The setting can be manually chosen when making a new route request. If the user is logged in, this field will pre-populate with the user’s profile preference or most recently selected method.
      - Based on the chosen method, the algorithm should return a route that primarily utilizes that method.
      - Optional feature: incorporate e-scooter API information to find nearby e-bikes and e-scooters that the user can walk to.
   4. The user can create an account and save addresses to their Favorites list.
      - User information needs to be saved in a database, with necessary authentication to verify access privileges.
      - Within the user’s profile there will be a list of saved addresses that the user can edit.
      - There will be an input field for adding new addresses to the Favorites list.
      - Each item in the favorites list can be removed with a single button press.
   5. With an account, the user can create a weekly schedule for their commute.
      - Within a user’s profile there needs to be input fields that can save addresses and arrival times for each day of the week.
      - Have the user be able to save their schedule in a calendar format in a database.
      - Allow the user to save their schedule over multiple weeks so they do not have to re-input them every week
      - Have the user able to view their schedule in a calendar format and see other weeks.
   6. With an account, once the user has populated their weekly schedule they can press a button to receive a full breakdown of their commute for that week.
      - Show each day’s suggested leave time arrival time to and from their desired locations
      - Provide notification to the user to update their leave and arrival times if any delays happen.
      - Visualize the routes of each day by selecting them one by one and highlighting on the map.
      - Create routes based on their preferences saved into their account. (mentioned in other User Stories)
   7. The user can send a particular route or weekly schedule to their phone via SMS.
      - Save the user’s phone number to their account so that the application can send them a notification
      - Connect SMS capabilities to the application so user may receive the messages
      - Format the route information to be easily readable in text form on phones
      - Allow for multiple phone numbers to be saved so the user can send route information to other people.
   8. The user can select different universities or cities as their “home” map and save those settings to their account.
      - Have access and implement University Transit System APIs
      - Have the ability to select what the routing algorithm takes into account depending on your preferences.
      - Visualize the transit system routes on the map to give users a better understanding of their route
      - Save preferences in a database attached to their account so it does not have to be reselected after every use

   2.2 Assumptions and Dependencies

3. System Features and Requirements
   3.1 Functional Requirements
   3.2 External Interface Requirements

   Use your design mocks for this section.
   3.3 System Requirements\*

   These describe required conditions for your software to be able to run. These would typically be CPU/RAM requirements, like you see for some video games. For a web app, you may not have anything to say in this section, and that's fine - just call out if there are any special requirements or heavy loads your server may have to deal with.
   3.4 Nonfunctional Requirements
