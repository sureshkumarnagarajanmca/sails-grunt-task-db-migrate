const util = require( 'util' )
const exec = util.promisify( require( 'child_process' ).exec )

let fun = ( async () => {
  try {
    let result = await exec( `npm i ../../ --prefix ../../` )
  } catch( e ) {
    throw e
  }
})()