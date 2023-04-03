# Sprint 1

During Sprint 1, our team focused on planning and setting up infrastructure for the future sprints. On the frontend side, we designed of our pages and created a plan for user navigation. We also implemented the home page with an infinite-scroll feed and set up code to fetch data about games from the backend API. On the backend side, we wrote scripts to fetch data from third-party APIs (Steam, IGDB), set up a database with some mock data, and created an Express app with routes to return data from our DB. We also set up a CI/CD pipeline with testing, linting, and deployment. Finally, we researched the algorithms we need to implement (search, filter, recommendation).

Overall, we felt that the workload we planned for this sprint was just right, since we were able to complete all of our tasks just on time. Plus, the tasks we planned were challenging, but not impossible.

Our communication as a team has improved since the preliminary sprint. Firstly, we are now using GitLab issue board more often. We created a template for tagging issues and are constantly updating our board to track progress. We also now hold stand-up meetings every class to discuss our progress on current tasks and plan out who will work on what in the task.

We still do not pre-assign tasks. Instead, we let team members choose tasks they are interested or capable in. This method works well for us, since we are effectively using issue boards and stand-ups to stay organized.

# Sprint 2

For this sprint, we were able to focus more on what information we wanted to display to our users. On the frontend side, we added the user profile with settings, a community page (with mock data for now), a log in feature with Google Authentication and Steam, a friend list (with mock data for now) and the game detail view. As for the backend side, we completed the Java Importer tool, the models for the DB, the routes and we are now able to display games to our Home page.

As a team, we have really improved our teamwork and were able to complete the tasks assigned for this sprint.

Our communication has been similar to the last sprint but we have used our communication tool more often to ensure we weren't causing issues to other teammates as the tasks were overlapping more for this sprint.

We have ensure to assign the tasks that are in progress more as it was mentioned that it could cause confusion.

## Mykyta Onipchenko
- **Champion feature**
  - Mobile friendliness
- **This sprint**
  - Adapted game feed tiles for mobile view
    - Moved and grouped rating elements to maximize space for text elements (title, description, developers)
    - Made a layout with picture on top
    - Darkened the background to show a clickable area

## Shirley Maa
- **Champion feature**
  - Multi language
- **This sprint**
  - Setting up the react structure for multi language feather 
  - Translated
    - header.js
    - UserProfile.js
    - UserSetting.js
    - GameList.js
    - GameDetailView.js 

## Liliane Tran Le
- **Champion feature**
 - Accessibility
- **This sprint**
 - Researching on how to create a dark/light mode
 - Increasing fonts for better readability

## Raagav Prasanna
- **Champion feature**
  - User Messaging application
- **Sprint2**
  - Did research on how to specfically implement web sockets in the application.
    - Found out about a library called Socket.io
    - Will implement this feature in the 3rd Sprint.

# Paul Patrick Rabanal
- **Champion feature**
  - Mobile friendliness
- **This sprint**
  - Adapted navbar for mobile view:
    - Created a toggable hamburger icon.
    - Created a menu that will display a column of the navigation links when the hamburger icon is pressed.
    - Modified the navbar to hide the navigation links and show the hamburger icon when the screen is shrinked.


# Sprint 3

In this sprint, we have decided to prioritize the tasks that we believe were more important than others. On the frontend side, we were able to make the tags clickable and able to filter the games, we have a multi-language feature, our thumbs up/thumbs down feature, our light and dark mode, our mobile friendliness and have also fixed some small issues. On the backend, we have ensured that the DB does not crash when a non-existent game is added, we have removed all the HTML tags that were generated when fetching from the API, we have also improved our security for any code injections or anything else and perfected our Java importer tool.

After the scrum meeting, we decided to replan our priorities and have wrote them on the board so that it is clear to everyone. We also did a tentative schedule to ensure that we know how much time we should put on each feature and we have really followed it and that is why we were able to finish all the tasks that were assigned to each other.

Our communication has been the same since the Proof of Concept and it is really the best we could have.

Any tasks were pre-assigned as we wanted to ensure that everything is covered and done before the deadline.

## Mykyta Onipchenko
- **Champion feature**
  - Mobile friendliness
- **This sprint**
   - Tablet view for the feed
   - Mobile view for game detials view
   - Mobile view for user preferences first login form

## Shirley Maa
- **Champion feature**
  - Multi-language
- **This sprint**
  - Ensured that the static text in the application's UI are translated for 3 more languages.

## Liliane Tran Le
- **Champion feature**
 - Accessibility
- **This sprint**
 - Created Context Object for storing the site's theme state (dark and light mode).
 - Added a toggle component in the navbar to allow the user to switch between themes.
 - Modified styling sheets for the different themes.

## Raagav Prasanna
- **Champion feature**
  - Security
- **This sprint**
  - Implement CSRF security on all post requests
  - Validation on all incoming data to prevent malicious injection 

# Paul Patrick Rabanal
- **Champion feature**
  - Mobile friendliness
- **This sprint**
  - Ensured that the user profile and wishlist is mobile-friendly.
  - Ensured that the game tags remain clickable in smaller screens.
