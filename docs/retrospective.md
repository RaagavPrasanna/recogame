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