import InputText from "./components/InputText/InputText.tsx";
import Keyboard from "./components/Keyboard/Keyboard.tsx";
import Timer from "./components/Timer/Timer.tsx";
import { useGetTextQuery } from "./store/services/text.api.ts";
import Spinner from "./components/Spinner/Spinner.tsx";

function App() {
  const { isLoading } = useGetTextQuery();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Timer />
      <InputText />
      <Keyboard />
    </>
  );
}

export default App;
