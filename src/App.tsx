import { useState } from "react";

function App() {
  const [stateTheme, setTheme] = useState("system");
  return (
    <>
      主题: {stateTheme}
      <button
        onClick={async () => {
          const isDarkMode = await window.darkMode.toggle();
          setTheme(isDarkMode ? "Dark" : "Light");
        }}
      >
        切换主题
      </button>
      <button
        onClick={() => {
          setTheme("Light");
          window.darkMode.light();
        }}
      >
        切换为 light
      </button>
      <button
        onClick={() => {
          setTheme("Dark");
          window.darkMode.dark();
        }}
      >
        切换为 dark
      </button>
      <button
        onClick={() => {
          setTheme("system");
          window.darkMode.system();
        }}
      >
        切换为系统主题
      </button>
      <button
        onClick={() => {
          Notification.requestPermission().then((result) => {
            console.log(result);
          });

          alert(Notification.permission);
          const a = new window.Notification("主标题", {
            title: "主标题",
            subtitle: "副标题",
            body: "内容",
          } as any);
          console.log(a);
        }}
      >
        发送通知
      </button>
    </>
  );
}

export default App;
