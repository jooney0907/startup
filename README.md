# Quiztopia (multiplayer trivia game)


Quiztopia will be a multiplayer trivia game that players can play real time and compete with each other. The modern trivia game has emerged in the 20th century and has been popular ever since. In Quiztopia you will be able to compete with friends and family. Play to answer some fun trivia questions.

## 🚀 Specification Deliverable

> [!NOTE]
>  Fill in this sections as the submission artifact for this deliverable. You can refer to this [example](https://github.com/webprogramming260/startup-example/blob/main/README.md) for inspiration.

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] Proper use of Markdown
- [x] A concise and compelling elevator pitch
- [x] Description of key features
- [x] Description of how you will use each technology
- [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

Have you and your family wanted to do something together but didn't know what? With quiztopia you will never have to worry about finding a fun activity with your family ever again. Quiztopia allows users to sign in and go through various different questions. Quiztopia is a simple but very fun way to compete and see which family member or friend has the greatest trivai knowledge!

### Design
![IMG_7712](https://github.com/user-attachments/assets/2d86469a-5413-40d2-baae-5370ce5ba323)
![IMG_7711](https://github.com/user-attachments/assets/c81d2cf5-6cbb-4a46-a964-0a6b6fe4e861)

### Key features

- People can register and log in
- Multiplayer lobbies
- database to store high scores and login information
- Live trivia questions with instant feedback to see what the right answer was
- grabs trivia questions from a API

### Technologies

I am going to use the required technologies in the following ways.

- **HTML** - Will have 3 HTML pages. The first page is the login page and then it will take them to the lobby once they log in. Once the game starts, it will get them into the game page. 
- **CSS** - Styling so that it is visually appeasing make the buttons colorful. 
- **React** - Provides login, lobby, trivia questions, and scoreboard.
- **Service** - Backend service with endpoints for things like /register, /login, /scores. Grabs trivia questions from https://opentdb.com/browse.php?page=3
- **DB/Login** - Going to store user information and high scores. 
- **WebSocket** - Will have real time player functions. For example people will be able to play with each other in real time. 

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Server deployed and accessible with custom domain name** - https://playquiztopia.click

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **HTML pages** - 5 html files and one for each part of the website. One is the register('register.html'), lobby('lobby.html'), scores('scores.html'), game('game.html'), about(about.html), and home page('index.html)'.
- [x] **Proper HTML element usage** - I have it so that I included header, footer, main, img, button, and other various things. 
- [x] **Links** - I have links that make it so that you can go click on a button and go to another page
- [X] **Text** - There is text in the about page.
- [X] **3rd party API placeholder** - Trivia questions will be from a API.
- [X] **Images** - Pictures in about page and game page. 
- [x] **Login placeholder** - In my Index file there is a place to login.
- [x] **DB data placeholder** - High scores on scores page.
- [x] **WebSocket placeholder** - on the game page you will be able to see who else got it right and their answers. 

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Header, footer, and main content body** - I made a css file for each individual html file. Most of them have similar/same content in it.
- [x] **Navigation elements** - I used bootstrap nav to help out.    
- [x] **Responsive to window resizing** - I used bootstrap and displayflex to respond to what happens when the window resizes.
- [x] **Application elements** - I used displayflex and I used other things like margins.
- [x] **Application text content** - I used bootstrap's class lead to make it look better. 
- [x] **Application images** - I smoothed out the edges of the picture and editted the size of the images.
## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **Bundled using Vite** - Installed and used Vite and set it up in correct format. 
- [x] **Components** - Have multiple different components in seperate files. 
- [x] **Router** - I'm using things like NavLink as routes.

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [x] **All functionality implemented or mocked out** - I have local storage done with it now once you log in and mapped out other things. I have placeholders for things like when I get the 3rd person API for my trivia questions. 
- [x] **Hooks** - I did extensive use of useStates and useEffects 

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Node.js/Express HTTP service** - I did not complete this part of the deliverable.
- [ ] **Static middleware for frontend** - I did not complete this part of the deliverable.
- [ ] **Calls to third party endpoints** - I did not complete this part of the deliverable.
- [ ] **Backend service endpoints** - I did not complete this part of the deliverable.
- [ ] **Frontend calls service endpoints** - I did not complete this part of the deliverable.
- [ ] **Supports registration, login, logout, and restricted endpoint** - I did not complete this part of the deliverable.


## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Stores data in MongoDB** - I did not complete this part of the deliverable.
- [ ] **Stores credentials in MongoDB** - I did not complete this part of the deliverable.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

- [ ] **Backend listens for WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Frontend makes WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **Data sent over WebSocket connection** - I did not complete this part of the deliverable.
- [ ] **WebSocket data displayed** - I did not complete this part of the deliverable.
- [ ] **Application is fully functional** - I did not complete this part of the deliverable.
