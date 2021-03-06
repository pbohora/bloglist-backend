## Bloglist-backend

Back-end for the Blog post application. The contains the features like

- list of available blogs
- clicking each blog item shows the details of the blogs,
- a option to delate the blog (if the blog is created by the logged in user) and like the blog.
- sign up and login using JWT
  The repository for the backend is available in https://github.com/pbohora/bloglist-frontend.

## Motivation

The project is the part of full-stack course from University of Helsinki. The implementaion of the project contains latest web development practices and test driven development.

## ScreeenShots

## Tech/framework used

- NodeJs
- Mongodb
- Jest
- Cypress

## Code Examples

## Quick start

#### 1. Clone the Repo

` git clone https://github.com/pbohora/Bloglist-backend.git`

#### 2. Install all packages

```
cd Bloglist-frontend/
npm install
```

#### 3. Add .env file

Create a .env file at the root of the project with following environment variables

```
MONGODB_URI=<your MongoDB database URI>
TEST_MONGODB_URI=<your MongoDB test database URI>
PORT=<Port where you wan to run the application eg: 3001>
SECRET=<any random text for JWT secret>
```

#### 4. Run the application

To run the application, use the following command:

```
npm run watch
```

The application is now running at `http://localhost:3001`

### Eslint

run eslint

```
npm run lint
```

fix lint

```
npm run lint-fix
```

### Test

Unit test is done using React testing library and for the E2E testing it uses Cypress.
