# Tech Stack = { NODE, TS, EXPRESS, KNEX, MULTER, EJS, CLOUDINARY, RAILWAYS },

## create migration file

=> npx knex migrate:make migration_name --knexfile src/config/db.ts

## run migration file

=> npx knex migrate:latest --knexfile src/config/db.ts

### get dot env from .env.example file, and use it for your development

### How to run project ?

1. clone repo
2. yarn install
3. set your dot env file
4. see commands on package.json
