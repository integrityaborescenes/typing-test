import InputText from "./components/InputText/InputText.tsx";
import Keyboard from "./components/Keyboard/Keyboard.tsx";
import Timer from "./components/Timer/Timer.tsx";

function App() {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        <Timer />
        <InputText />
        <Keyboard />
      </div>
    </>
  );
}

export default App;
