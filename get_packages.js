let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )
var Sails = require('sails').Sails

let packagesToBeInstalledArray = [ "db-migrate" ]

let getPackages = () => {
  let env = process.env.NODE_ENV

  let sailsConfig = {
    port: -1,
    log: { level: process.env.LOG_LEVEL || 'silent' },
    environment: env,
    migrating: true
  };

  // load Sails to get the effective configuration. We don't actually need to
  // run it, and we certainly don't want any log messages. We just want the
  // config.
  sails = new Sails()
  sailsConfig = sails.config
  console.log( sailsConfig )
  let connection

  if (!sailsConfig.migrations) {
    throw new Error('Migrations not configured. Please setup ./config/migrations.js')
  }

  var connectionName = sailsConfig.migrations.connection
  if (!connectionName) {
    throw new Error('connection missing from ./config/migrations.js')
  }

  if( typeof sailsConfig.datastores !== 'undefined' ) {
    connection = sailsConfig.datastores[connectionName]
  } else if( typeof sailsConfig.connections !== 'undefined' ) {
    connection = sailsConfig.connections[connectionName]
  } else {
    throw new Error( 'Invalid connection' )
  }

  switch( connection.adapter ) {
    case 'sails-mysql':
      packagesToBeInstalledArray.push( "db-migrate-mysql" )
      break;
    case 'sails-postgresql':
      packagesToBeInstalledArray.push( "db-migrate-pg" )
      break;
    case 'sails-mongo':
      packagesToBeInstalledArray.push( "db-migrate-mongodb" )
      break;
    default:
      throw new Error('migrations not supported for ' + connection.adapter);
  }

  return packagesToBeInstalledArray
}

module.exports = {
  getPackages: getPackages
}