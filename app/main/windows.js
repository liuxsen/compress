const { isDevMode } = require('../utils/devmode');
const { BrowserWindow } = require('electron');
const path = require('path');
let browserWindows = [];

// 获取新建主窗口参数
const getMainWindowOptions = (width=800, height= 600) => {
  return {
    width,
    height,
    // titleBarStyle: process.platform === 'darwin' ? 'hidden' : undefined,
    // backgroundColor: '#1d2427',
    webPreferences: {
      nodeIntegration: true
    }
  };
};

// 创建主窗口
const createMainWindow = (width, height, hash = '') => {
  console.log(`Creating main window`);
  const browserWindow = new BrowserWindow(getMainWindowOptions(width, height));
  if(isDevMode()){
    browserWindow.loadURL(`http://localhost:4001/#${hash}`);
  }else{
    browserWindow.loadFile(path.join(__dirname, `../../dist/index.html`));
  }
  browserWindow.webContents.once('dom-ready', ()=>{
    browserWindow.show();
  });
  // 如果窗口关闭，更新保存的多个窗口数组
  browserWindow.on('closed', () => {
    browserWindows = browserWindows.filter(bw => browserWindow !== bw);
  });
  browserWindows.push(browserWindow);
  return browserWindow;
};

const getOrCreateMainWindow = () => {
  return BrowserWindow.getFocusedWindow() || browserWindows[0] || createMainWindow();
};

exports.browserWindows = browserWindows;
exports.createMainWindow = createMainWindow;
exports.getOrCreateMainWindow = getOrCreateMainWindow;