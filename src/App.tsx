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
    </>
  );
}

export default App;
