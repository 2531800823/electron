/// <reference types="vite/client" />

interface IDarkMode {
  /** 切换 */
  toggle: () => Promise<boolean>;
  /** 切换为 light */
  light: () => void;
  /** 切换为  dark */
  dark: () => void;
  /** 切换 系统 */
  system: () => void;
}

interface MyWindow {
  /** 和渲染进程通讯 */
  ipcRenderer: any;
  /** 主题切换 */
  darkMode: IDarkMode;
}

interface Window extends MyWindow {}
