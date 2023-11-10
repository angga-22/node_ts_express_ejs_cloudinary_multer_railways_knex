# create migration file

=> npx knex migrate:make migration_name --knexfile src/config/db.ts

# run migration file

=> npx knex migrate:latest --knexfile src/config/db.ts

## get dot env from .env.example file, and use it for your development
