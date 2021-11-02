## Week 5

### Issues to work on:
- Cloning previous team files cloned on to local device
- Understanding how previous systems work and how to build on them
- Getting the front and back end to work
- Start working on the video assignment for next week
- Upload git stats and repository link on canvas


### Meeting with Kimberlee on October 1st:
- Acquire mailing information 
- Going over process of 2 step verification when logging into systems
- Get a priority ranking from Kimberlee on features needed


### Meeting with Jen (previous project member) October 5th:
- Deployment will be very challenging
- Not all repos from gitlabs are needed (only 4 out of the 6)
- Use SSH keys to pull from gitlabd

### Deploying Frontend locally
- Had to navigate folders on terminal from frontend -> frontendapp
- Delete and clean any old npm modules
- npm cache clean --force
- rd /s /q "node_modules"
- npm install
- npm audit fix
- npm start
- NOTE: If getting "Delete cr [prettier/prettier]" error, the following code must be added to the rules object in the .eslintrc.js file:
        "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      },
    ],

### Meeting with Kimberlee Oct 8th:
- Explained that the front end is working on our local machine but not the back end.
- One group member reached out to a previous developer for back end help but did not succeed in getting it running.
- Kimberlee is going to reach out to previous team for backend help.
- Possibility of creating our own backend and melting it together with the front end provided by the previous developers. 
- Changing the files in the database to mongodb instead of postgresql.
- Changing the meeting place from google to discord.
- Have the previous developers create a video on how to get the backend running on our machines.
- Kimberlee will reach out to her contact in Telus to meet with us for further help.
- Kimberlee provided a ux design of the website and how all the pages work on a simple scale.
