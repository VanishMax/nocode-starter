# No-code application

Create presentation websites with this no-code tool! Run the no-code platform, develop your
presentation with drag-and-drop and collaboration features, publish it and enjoy!

This project uses the [No-code starter template](https://github.com/vanishmax/nocode-starter).

## Getting started

To run the platform, you firstly need to add all required environmental variables. 
Open the `.env` file and edit them. This is an example you should get:

```dotenv
DATABASE_URL="mongodb+srv://<user>:<password>@<db_url>?retryWrites=true&w=majority"
AUTH_SECRET="some-secret"
```

You can get `DATABASE_URL` from [the Atlas](https://www.mongodb.com/atlas/database) or installing your local Mongo DB.
`AUTH_SECRET` can be any string (like a password), but ensure no one has it.

Later on, simply run the `start` command with your favorite package manager.
It will open the No-code UI and start backend service.

```bash
npm start
```
