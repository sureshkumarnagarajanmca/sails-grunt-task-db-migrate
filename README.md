You need to setup `config/migrations.js` to name the connection which you will
use to run migrations.

```JavaScript
// config/migrations.js
module.exports.migrations = {
  // connection name matches a field from config/connections.js
  connection: 'default' // or MySQL
};
```

Optionally, you can specify in the config file the name of the database table to
be used to track migrations (defaults to `migrations`), the directory to use for
migrations (defaults to `migrations`), and whether to create a coffeescript
file for the migrations instead of javascript file (defaults to `false`).

```JavaScript
// config/migrations.js
module.exports.migrations = {
  // connection name matches a field from config/connections.js
  connection: 'somePostgresqlServer', // or MySQL
  table: 'sails_migrations',
  migrationsDir: 'sails_migrations',
  coffeeFile: true
};
```

You'll also need to setup `tasks/register/dbMigrate.js` to add the `db:migrate`
tasks to grunt.

```JavaScript
// tasks/register/dbMigrate.js
module.exports = require( 'sails-grunt-task-db-migrate' ).sailsGruntTasks
```


 [db-migrate]: https://github.com/kunklejr/node-db-migrate
 [sails.js]: http://sailsjs.org/
 [grunt]: http://gruntjs.com/
 [db-migrate docs]: https://github.com/kunklejr/node-db-migrate#migrations-api
 [open issues]: https://github.com/sureshkumarnagarajanmca/sails-grunt-task-db-migrate/issues


 npm i -S sails-grunt-task-db-migrate

 grunt db:migrate:create --name=create_test_schema

 grunt db:migrate:up
 
 grunt db:migrate:down --count=150

 grunt db:migrate:db:create --db-name=test_db

 grunt db:migrate:db:drop --db-name=test_db