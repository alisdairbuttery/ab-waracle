## Introduction

Waracle tech test solution by Alisdair Buttery

Email: alisdairb1995@gmail.com

## How do i run the solution?

The app can follow the below steps to launch the application;

1. Navigate to the app folder in the solution root
2. Locate and change the file named `example.env` to `.env`
3. In the file now named `.env` locate the environment variable `REACT_APP_CAT_API_KEY` and paste in your API key after the `=`; one has been provided in a privnote to the recruiter
4. Install the required dependencies using the command `npm install`
5. Once dependecies have installed run `npm run start` to launch the app.


#### Some highlights of my thought process

With the Cat API my main aim was to implement this as an abstraction so that the component/pages don't need to know about implementation detail beyond passing the required info. The main advantage to this being moving to a different API would require less changes and overal components become much simpler as they need to know much less implementation detail.

For the app front-end Create-React-App was used to scaffolding the project; primarily due to time constraints otherwise i would usually build up the project from scratch with Webpack and the desired dependencies.

Using Reach Router the `Home` and `Upload` pages are their own route to aid with the user experience specifically for the ability to share and access the upload form without the need to always go through a button on the home screen.


#### Future improvements

Give more free time to work omn it my next task would be adding unit test coverage at both a component and functional level.

- Implement call to fetchg users favourites and update images on fetch to be able to highlight which ones the user has already favourites. Currently this is only stored in a local variable and thus destroyed on changing pages.

This would be done using Jest as the test runner along with React testing library for asserting in component/React functionality specific tests.

- Implement some logic into the header to highlight which page the user is on in the main nav; currently it is hard coded to the home screen.

- Tidy the upload screen by moving the upload form into it's own component file to make isolated component testing easier and generally make the screen code much cleaner and simpler to read.

- Introduce a simple form of dependecy injection to allow one API client to be created in the main app file and passed into the views that require it. Currently each view has to know how to

- Placeholders have been created for handling errors; I would look to create a consistent way of handling these errors in the screens such as through component error boundaries which would allow errors to be handled easily with a dedicated way of displaying them on the screen no matter how the error occurs.

## Technology used

### Front-end
- Create-React-App
- Typescript
- Reach router
- Axios
- React Helmet: Allows manipulation of the document head, specifically used to change page titles
- Tailwinds styling/css library

### Tooling
- Jest
- React testing library

### Dev environment tooling
- Visual Studio code
- Postman