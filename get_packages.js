let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )
let sails = require( 'sails' )

let packagesToBeInstalledArray = [ "db-migrate" ]

let getPackages = () => {
  let sailsConfig = sails.config
  let connection
console.log( sailsConfig )
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