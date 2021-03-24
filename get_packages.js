let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )

let packagesToBeInstalledArray = [ "db-migrate" ]

let getPackages = () => {
  if( packageString.indexOf( '"sails-mongo":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-mongodb" )
  } else if( packageString.indexOf( '"sails-mysql":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-mysql" )
  } else if( packageString.indexOf( '"sails-postgresql":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-pg" )
  }

  return packagesToBeInstalledArray
}

module.exports = {
  getPackages: getPackages
}