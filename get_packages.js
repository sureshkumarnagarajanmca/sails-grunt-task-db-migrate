let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )
let migrations = require( '../../config/migrations' )
let datastores = require( '../../config/datastores' )
let config
if( process.env.NODE_ENV === 'production' ) {
  config = require( '../../config/env/production' )
} else {
  config = require( '../../config/env/development' )
}

let datastoresConfig = {
  ...datastores.datastores, 
  ...config.datastores
}

let packagesToBeInstalledArray = [ "db-migrate" ]

let getPackages = async () => {
  let connection

  if( !migrations.migrations ) {
    throw new Error('Migrations not configured. Please setup ./config/migrations.js')
  }

  var connectionName = migrations.migrations.connection
  if (!connectionName) {
    throw new Error('connection missing from ./config/migrations.js')
  }

  if( typeof datastoresConfig !== 'undefined' ) {
    connection = datastoresConfig[connectionName]
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
      throw new Error('migrations not supported for ' + connection.adapter)
  }

  return packagesToBeInstalledArray
}

module.exports = {
  getPackages: getPackages
}