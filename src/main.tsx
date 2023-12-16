import ReactDOM from "react-dom/client";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// Remove Preload scripts loading
postMessage({ payload: "removeLoading" }, "*");

// Use contextBridge  监听 ipc 通讯
window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
