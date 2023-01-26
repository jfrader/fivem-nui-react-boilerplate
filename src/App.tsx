import "./App.css";
import { NuiProvider } from "fivem-nui-react-lib";
import { Example } from "./Example";

function App() {
  return (
    <NuiProvider resource="my-resource-name" timeout={2500}>
      <div className="App">
        <header className="App-header">
          <Example />
        </header>
      </div>
    </NuiProvider>
  );
}

export default App;
