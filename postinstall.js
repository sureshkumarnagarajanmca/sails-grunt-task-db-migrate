const {exec} = require('child_process');
var path = require('path')
var appDir = path.dirname(require.main.filename)
console.log( appDir )
/*if (process.platform !== 'win32') {
  // run scripts for Windows
  return;
}*/

let package = require( path.join( appDir, 'package.json' )
let command = ''

package = JSON.stringify( package )

if( package.indexOf( '"sails-mongo":' ) !== -1 ) {
  command = 'npm i -S db-migrate-mongodb'
} else if( package.indexOf( '"sails-mysql":' ) !== -1 ) {
  command = 'npm i -S db-migrate-mysql'
} else if( package.indexOf( '"sails-postgresql":' ) !== -1 ) {
  command = 'npm i -S db-migrate-pg'
} else {
  return
}

const executedCommands = exec(command, (error) => {
  if (error) {
    throw error;
 }
});