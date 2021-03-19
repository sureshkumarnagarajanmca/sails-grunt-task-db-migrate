const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )
const fs = require( 'fs' ).promises
let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )

let fun = ( async () => {
  let packagesToBeInstalledArray = [ "db-migrate" ]

  if( packageString.indexOf( '"sails-mongo":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-mongodb" )
  } else if( packageString.indexOf( '"sails-mysql":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-mysql" )
  } else if( packageString.indexOf( '"sails-postgresql":' ) !== -1 ) {
    packagesToBeInstalledArray.push( "db-migrate-pg" )
  }

  let packagesToBeInstalledObj = {}

  try {
    let result = await exec( `npm view ${ packagesToBeInstalledArray[ 0 ] } version` )
    packagesToBeInstalledObj[ packagesToBeInstalledArray[ 0 ] ] = "^" + result.stdout.replace(/\n/g, '')

    if( typeof packagesToBeInstalledArray[ 1 ] !== 'undefined' ) {
      result = await exec( `npm view ${ packagesToBeInstalledArray[ 1 ] } version` )
      packagesToBeInstalledObj[ packagesToBeInstalledArray[ 1 ] ] = "^" + result.stdout.replace(/\n/g, '')
    }

    package.dependencies = {
      ...package.dependencies, 
      ...packagesToBeInstalledObj 
    }

    fs.writeFile( packageFilePath, JSON.stringify( package, null, 2 ) )
    
  } catch( e ) {
    throw e
  }
})()