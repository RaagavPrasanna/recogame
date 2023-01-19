---
title:  'Project Proposal'
author:
- Dan Pomerantz, Sam Imberman
- 420-620-DW
---

# Web Development Project Proposal

Please copy this document to final project GitLab repository (**not the proof of concept repo**), in a branch named `proposal`. I will given you my comments in the MR.

(read the tutorials/gitTips.md!)

## Identification

Student participant names:

1. Mykyta Onipchenko
2. Raagav Prasanna
3. Liliane Tran Le
4. Shirley Maa
5. Paul Patrick Rabanal

The name of your team’s software company: **WAVCrash**

Official project name (can be changed later): **WAVify**

Project’s internal codename (cannot be changed later): **Bob**

_n.b: A software project usually has a codename which is immune to the vagaries of your company’s marketing department. For example, one notorious version of Windows was internally referred to as “Longhorn” and one notorious version of Mac OS was referred to as “Rhapsody”. The latter-day tradition of naming versions of Mac OS after cats or places in California comes directly from the much older tradition of internal software codenames._

_You should give your project a codename so that you can use it inside your software; it gives you an obvious namespace, a name for a singleton object, a prefix for whatever APIs you create, and so on. It should be something fun and memorable, but be careful, because names written in code are much harder to change than names invented by the marketing department!_



## Project summary

In as few words as possible but without sacrificing accuracy, give a high-level summary of your project:

The project requires you to import a large data set. What data set(s) will you need for this project? Please include specific URLs. An important thing to check is that your data set includes the necessary information for your project! You should look at the columns of it and see what is there!

What will make your web site unique? For example, is there a specific feature that your website will focus on? Will you appeal to a specific set of customers? (Please note that if you don't have any great ideas, it's okay 😊 It's mostly just to think about the real world aspects of your program!)

---

- Our app is a
    - Music platform
        - Listen to music
        - Post music
        - View details about music / album / artist
        - Upcoming concerts
    - Community driven
        - Likes
        - Comments on time stamps
        - Shares
        - Follows
        - Playlists
    - Where even listeners can contribute to their favorite songs
        - Lyrics / translations
        - ? Sheet music
- Data sets


## User stories

### About user personas

In order to correctly choose what features to develop and in what order, we need to think about “target user personas" for our software – in other words, to classify the types of people who would be likely to use the software in different ways. Individuals may fall into different user personas over time depending on how they are using the software at a given moment. For example, if your app were a collaborative recipe book web app, your target user personas might include:

- recipe contributors, who want to write recipe profiles and put them on the site, and therefore need good recipe editing tools;
- recipe browsers, who are looking for a recipe to cook, and therefore need an excellent browsing and search system;
- people currently using the app while cooking, who may need a customized view of a recipe that they can put on a tablet propped up in the kitchen;
- recipe moderators, whose role is to do quality verification for the recipes, make sure that all sections of recipes are filled in, remove inappropriate language, and so on;
- ... and perhaps other categories?

Note that the same individual may be a “recipe browser” at some times and a “recipe contributor” at others.

Developing user personas for your own project will help you tailor your features to particular people, and to prioritize between features.

When we have figured out our target user personas, we write “use cases” describing how our target user profpersonasiles are likely to interact with our software.

### Example

---

**Persona description**: Recipe browser

**Name**: Bert

**Importance of users corresponding to this profile**: Very important! 90% or more of people

**Broad goal**: To find something to cook

**How the software satisfies the needs of this user profile**:

- User story  
  _Feature provided for the use case_

- As a recipe browser, I want to find a dish that I wish to cook (e.g. “steak au poivre”)  
  _A search box somewhere on top_  
  _A profile history of recently visited recipes_

- As a recipe browser, I wish to save recipes I like in order to find them again later  
  _A “recipe book”_  
  _The ability to star individual recipes_

- As a recipe browser, I wish to explore the available recipes to find something interesting to cook  
  _A “most recent recipes” view_  
  _A “search by ingredient” page?_

---

### Target user personas

Please copy and paste the below “user persona" section as many times as necessary. There must be at least 2; there are likely to be 3 or more. Note that “administrators” and so on are users too. You may change these personas later if you need to.

---

### User persona 1

**Persona description**: Content consumer (logged in)

**Name**: Jaye

**Importance of users corresponding to this persona**: Very important! 90%

**Broad goal**: Listen to music and share their experience (comment, like, share)

User stories (give at least 2):

- As a content consumer, I want to listen to music
    - Search bar
    - Detail list for album / playlist / artist
    - In-browser player

- As a content consumer, I want to relisten to my favorite songs
    - Playlists
    - Likes

- As a content consumer, I want to interact with other content consumers
    - Comment box with time stamps
    - Likes
    - Sharing

- As a content consumer, I want to discover music that may interest me
    - Comment box
    - Likes
    - Sharing
    - Tags
    - User profile
    - Follow artists

### User persona 2

**Persona description**: Artist (logged in)

**Name**: Juli

**Importance of users corresponding to this persona**: Important! 5% (often overlaps with **content consumers**)

**Broad goal**: Be able to post, share created music, reach the target audiences

User stories (give at least 2):

- Same as **content consumers**

- As an artist, I want to post my music
    - File upload
    - Music metadata (tags, album art)
    - In-browser player

- As an artist, I want to have feedback about my music
    - Likes
    - Shares
    - Comments
    - Listens

- As an artist, I want to reach my audiences
    - Tags
    - Search bar
    - Sharing

### User persona 3

**Persona description**: Admin (logged in and verified)

**Name**: Mark

**Importance of users corresponding to this persona**: Least important! \< 1%

**Broad goal**: Be able to monitor, block, hide offensive content / content that cannot be distributed for legal reasons

User stories (give at least 2):

- As an admin, I want to see controversial content
    - Reporting
    - Admin page
    - Tags

- As an admin, I want to block necessary content
    - Admin page

## Mockups

Insert one or more sketches/mockups of your project’s user interfaces here. After each mockup, write a list of which features from the table above are shown in each mockup and where they are represented. (You may also draw that directly on the mockup, with arrows.)

Please produce as many mockups as necessary to show as much of your application as possible.

n.b: If you submit a photo using a phone/tablet camera, please ensure it is as legible/clear as possible by taking the photo in good lighting and by positioning the camera directly above. Alternatively, you can use a scanner, or make your sketches in a mockup or vector drawing program such as Pencil or Figma.

---

Main UI:

(image here)

List of features presented:

- Feature 1
- Feature 2

---

Search UI (or whatever):

(image here)

List of features presented:

---

Details page UI (or whatever):

(image here)

List of features presented:

