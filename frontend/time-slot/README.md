# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The main branch is having the updated code of the POC.
The code is having backend and frontend folder.
backend - This folder consists of the API's Required for successfully running of the project along with required database script with the name db.sql.
frontend - This fomder have the UI created in React along with Jest tests. The available commands are mentioned below.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
Jest is being used for writing and performing tests.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Project Setup

The repository is available on [https://github.com/webistan/TimeSlot-POC](https://github.com/webistan/TimeSlot-POC)
Clone the repo using the following commands:

HTTPS: https://github.com/webistan/TimeSlot-POC.git
SSH: git@github.com:webistan/TimeSlot-POC.git

### Test Cases

1- Slot List Page Test

- SlotList Component Rendering Test
- Should show empty inputs when no values are provided Test
- Should show filled in inputs when values are provided Test
- Create SnapShots Tree of list page

2- Slot Card Test

- SlotCard Component Rendering Test
- Should check card be exist in Component Test
- Create SnapShots Tree of Slot Card Component

3- AddSlotPopUp Component

- AddSlotPopUp Component Rendering Test
- Should check Slot Card Pop Up be exist in Component Test
- Should check Slot copy day div not exist in Component
- Create SnapShots Tree of AddSlotPopUp Component
