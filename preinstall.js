const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )
const fs = require( 'fs' ).promises
let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )
let getPackages = require( './get_packages' )

let fun = ( async () => {
  let packagesToBeInstalledArray = getPackages.getPackages()

  let packagesToBeInstalledObj = {}

  try {
    let result = await exec( `npm view ${ packagesToBeInstalledArray[ 0 ] } version` )
    packagesToBeInstalledObj[ packagesToBeInstalledArray[ 0 ] ] = "^" + result.stdout.replace(/\n/g, '')

    if( typeof packagesToBeInstalledArray[ 1 ] !== 'undefined' ) {
      result = await exec( `npm view ${ packagesToBeInstalledArray[ 1 ] } version` )
      packagesToBeInstalledObj[ packagesToBeInstalledArray[ 1 ] ] = "^" + result.stdout.replace(/\n/g, '')
    }

    package.dependencies = {
      ...packagesToBeInstalledObj, 
      ...package.dependencies  
    }

    fs.writeFile( packageFilePath, JSON.stringify( package, null, 2 ) )
    
  } catch( e ) {
    throw e
  }
})()