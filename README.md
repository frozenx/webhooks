# ftp-ui

#To access beans components

- cd client
- create .npmrc file on client folder
    - add below configuration
        - email=TESCO_EMAIL
        - always-auth=true
        - _auth=NEXUS_PASSWORD
        - registry=https://nexus.ourtesco.com/repository/online-web-group/

    Replace TESCO_EMAIL with your Tesco email address and replace NEXUS_PASSWORD with <br />
    `<TPX ID>:<TescoGlobal password>` base64 encoded. <br/>
    You can encode your TPX and password using websites like base64encode. <br/>
    URL : https://www.base64encode.org/

#To start client

- cd client
- npm install
- npm start

#To start server

- cd server
- npm install
- node index.js
    - install nodemon if needed, for hot reloading
    - npm install nodemon -g (add -g to install it globally)
- nodemon index.js


