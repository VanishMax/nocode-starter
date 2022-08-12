# No-code application

Create presentation websites with this no-code tool! Run the no-code platform, develop your
presentation with drag-and-drop and collaboration features, publish it and enjoy!

This project uses the [No-code starter template](https://github.com/vanishmax/nocode-starter).

## Getting started

To run the platform, you firstly need to add all required environmental variables. 
Open the `.env` file and edit them. This is an example you should get:

```dotenv
SERVER_DATABASE_CONNECTION="mongodb+srv://<user>:<password>@<db_url>?retryWrites=true&w=majority"
SERVER_DATABASE_NAME="nocode-starter"
SERVER_AUTH_SECRET="some-secret"
```

You can get `SERVER_DATABASE_CONNECTION` from [the Atlas](https://www.mongodb.com/atlas/database) or installing your local Mongo DB.
`SERVER_DATABASE_NAME` is a database name. `SERVER_AUTH_SECRET` can be any string (like a password), but ensure no one has it.

Later on, simply run the `start` command with your favorite package manager.
It will open the No-code UI and start the server.

```bash
npm start
```
