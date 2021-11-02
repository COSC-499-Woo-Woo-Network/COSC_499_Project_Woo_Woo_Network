## Week 7

### Issues to work on
- Work on report due Wednesday
- Deploy backend (DONE)
- Peer evaluations due Friday
- Test functionality of website once it is running
- gitstats week 7


### Meeting on October 18th @ 4pm
- Discussed deploying backend
- Cody and Jiv succesfully deployed backend
- Cody gave video walkthrough on how to deploy
- Kimberlee asked us to test functionality of existing website before Friday's meeting


### Deploying Backend
- .env files need to be added to front and back end folders
- two projects must be opened 
- make sure npm is installed
- start front end (npm start)
- switch to back end
- npm ci
- node_modules/.bin/sequelize db:migrate
- make sure public/photos directory has been created
- npm run watch
- go into app.js in the src folder
- uncomment lines 80 and 81
- refresh front end page. Healers should show up on home page

### Meeting with Kimberlee on October 22nd @ 1pm
- going over who else cannnot get their backend functional
- anyone who is having errors after the meeting post issue into discord
- discussed where the data for the database is being stored
- discussed some verification features for client/healer
- Admin dashboard to remove inappropriate and/or illegal accounts 
    - possible features:
	- Remove/disable healers and clients
	- Reporting mechanism
	- Removing ads
    - Kimberless can verify accounts after they’ve been created, to not slow down the sign up process
    - Simple layout, don’t need to know a lot about the backend to use

- Kimberlee sugessted that a searchbar is good place to start with her providing tags by which to search by
    features include:
    - Users should be able to tag what they were dealing with/ what they were getting help with in their review of a healer
    - Add map to show healers close to the user
    - Search bar shown under global healing network box/just above browse our healers

- how it might be hard to validate if a person is a proper healer or not, figuring out a solution 
- Discussing insurance and the legality of the healers, see if there needs to be anything done code-wise and figuire out how ethics will play into this 
- Get everyone using the backend by monday
- Stripe will be used for payment
- If there needs to be any systems up and running, let kimberlee know
- we will ask the previous group about how the database is set up

