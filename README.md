## IMAGECHASE

This is a proof of concept application. The site is available under the url https://imagechase.herokuapp.com/. To be able to test all functions and features of the site, you need an admin login. Use the following login data to log in as admin.

email: `admin@imagechase.com`
password: `Imagechase_2021`

To experience the normal user experience, an account can be created.

### DEVELOPMENT SETUP

It is important that Docker is installed so that the application can be started locally. To setup your local develpment environment you must first create some environment variables. To do so you copy the `.env` files and then remove the `_example` extension. You find them in `/.env`, `/frontend/.env.local` and `/backend/.env`.
After that, the application can be started with a `docker compose up` in the root folder.
