const { getOrCreateMainWindow } = require('./windows');
const { setupDevTools } = require('./devtools');
const { app } = require('electron');
require('./event');

const onReady = async () => {
  getOrCreateMainWindow();
  setupDevTools();
};

function main(){
  app.on('ready', onReady);
}

main();
