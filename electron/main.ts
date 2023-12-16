import { app, BrowserWindow, globalShortcut, ipcMain, nativeTheme } from "electron";
import path from "node:path";

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, "../dist");
process.env.VITE_PUBLIC = app.isPackaged ? process.env.DIST : path.join(process.env.DIST, "../public");

let win: BrowserWindow | null;
// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];

function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "main.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", "给主进程发送消息");
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, "index.html"));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  // mac 特殊处理
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});

// 没有窗口时，创建窗口
app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

function ready() {
  createWindow();

  // 打开开发者工具
  if (process.env.NODE_ENV === "development") {
    win?.webContents.openDevTools();
  }
}

// app 模块的 ready 事件被激发后才能创建浏览器窗口
app
  .whenReady()
  .then(() => {
    // 注册快捷键
    globalShortcut.register("shift+F11", () => {
      // 可以创建全局变量，然后监听只获取焦点触发
      win?.webContents.toggleDevTools();
    });
  })
  .then(ready);

// 监听事件
ipcMain.handle("dark-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light";
  } else {
    nativeTheme.themeSource = "dark";
  }
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:light", () => {
  nativeTheme.themeSource = "light";
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:dark", () => {
  nativeTheme.themeSource = "dark";
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system";
});
