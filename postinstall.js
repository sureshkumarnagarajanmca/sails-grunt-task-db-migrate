const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )

let getPackages = require( './get_packages' )
let removeNodeModules = require( './remove_node_modules' )

let fun = ( async () => {
  let commandPrefix = ''
  if( /^win/.test( process.platform ) === false ) {
    commandPrefix = `sudo `
  }

  let command = `${commandPrefix}npm i -S `

  let packagesToBeInstalledArray = await getPackages.getPackages()
  command += packagesToBeInstalledArray.join( ' ' )

  command += ` --prefix ../../node_modules ../../`

  try {
    await exec( command )
    await removeNodeModules.removeNodeModules( 
      "../../node_modules/node_modules/", 
      "../../node_modules/", 
      packagesToBeInstalledArray 
    )
  } catch( e ) {
    throw e
  }
})()