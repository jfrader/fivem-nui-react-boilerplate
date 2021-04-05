import "./App.css";
import { NuiServiceProvider } from "fivem-nui-react-lib";
import { Example } from "./Example";

function App() {
  return (
    <NuiServiceProvider resource="my-resource-name">
      <div className="App">
        <header className="App-header">
          <Example />
        </header>
      </div>
    </NuiServiceProvider>
  );
}

export default App;
