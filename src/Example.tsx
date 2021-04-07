import styles from "./Example.module.css";
import { useEffect, useState } from "react";
import {
  useNuiEvent,
  useNuiCallback,
  useNuiRequest,
} from "fivem-nui-react-lib";

interface MethodExampleResponse {
  dummy: string;
}

interface FetchSomethingInput {
  dummy: number;
}

export function Example() {
  const [dataState, setDataState] = useState<MethodExampleResponse>();

  const { send } = useNuiRequest();

  useNuiEvent("appname", "methodname", setDataState);

  const [fetchSomething, { loading, error, response }] = useNuiCallback<
    FetchSomethingInput,
    MethodExampleResponse
  >("appname", "fetchSomething");

  useEffect(() => {
    fetchSomething({ dummy: 1 }, { timeout: 2000 });
  }, [fetchSomething]);

  useEffect(() => {
    // Just a request sent to client, no loading, no response.
    send("my-request", { dummy: "Im sending request" });
  }, [send]);

  const stringResponse = JSON.stringify(response);

  return (
    <div className={styles.ExampleClass}>
      <pre>{JSON.stringify(dataState)}</pre>
      <pre>{loading && <span>Loading...</span>}</pre>
      <pre>Response: {stringResponse || ''}</pre>
      {error && <pre>{(error as any).message}</pre>}
      <pre>
        <button onClick={() => fetchSomething({ dummy: 2 })}>fetch something again</button>
      </pre>
    </div>
  );
}
