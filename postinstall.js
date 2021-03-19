const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )
const fs = require( 'fs' )

let fun = ( async () => {
  try {
    if( fs.existsSync( '../../db-migrate' ) ) {
      return
    }

    let result = await exec( `npm i ../../ --prefix ../../` )
  } catch( e ) {
    throw e
  }
})()