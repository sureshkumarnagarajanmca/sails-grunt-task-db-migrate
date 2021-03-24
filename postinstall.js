const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )

let packageFilePath = '../../package.json'
let package = require( packageFilePath )
let lib = require( './lib' )

let fun = ( async () => {
  let command = `npm i -S `

  let packagesToBeInstalledArray = lib.getPackages()
  command += packagesToBeInstalledArray.join( ' ' )

  command += ` --prefix ../../node_modules ../../`

  try {
    await exec( command )
  } catch( e ) {
    throw e
  }
})()