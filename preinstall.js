const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )

let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let packageString = JSON.stringify( package )

let fun = ( async () => {
  let command = `npm i -S db-migrate`

  if( packageString.indexOf( '"sails-mongo":' ) !== -1 ) {
    command += ` db-migrate-mongodb `
  } else if( packageString.indexOf( '"sails-mysql":' ) !== -1 ) {
    command += ` db-migrate-mysql `
  } else if( packageString.indexOf( '"sails-postgresql":' ) !== -1 ) {
    command += ` db-migrate-pg `
  }

  command += `--prefix ../../ ../../`

  try {
    await exec( command )
  } catch( e ) {
    throw e
  }
})()