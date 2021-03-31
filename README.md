# sails-grunt-task-db-migrate

[db-migrate][] integration for [Sails.js][]. This is a fairly simple wrapper,
which provides [grunt][] tasks for running and creating migrations. It also
extracts the database configuration from the Sails config, so you don't have to
duplicate you config in a `database.json` file.

Supports Sails 0.10.x+ till Sails 1.2.4.

You don't need to install the dependencies manually. Instead, the dependencies ( like db-migrate, db-migrate-mongodb, etc... ) will be installed automatically. Before install this npm, please create `config/migrations.js`.

And also, this npm supports db:create, db:drop and db:seed.

## Setup

Installation is very typical.

```bash
$ npm install --save sails-grunt-task-db-migrate


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

And also, we can set `seedingDir` option. If it is not yet set, the default path will be `seeders` folder under root folder.

```JavaScript
// config/migrations.js
module.exports.migrations = {
  // connection name matches a field from config/connections.js
  connection: 'somePostgresqlServer', // or MySQL
  table: 'sails_migrations',
  migrationsDir: 'db/migrate',
  seedingDir: 'db/seeders', 
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

### Sample seeder file

```JavaScript
// seeders/TestTableSeeder.js or db/seeders/TestTableSeeder ( where TestTable is a model of a db table test_table )
module.exports = aysnc() {
  TestTable.create( { field1: 'value', field: 'value' } )
}
```