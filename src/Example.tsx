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
  const { send: sendToResource } = useNuiRequest({
    resource: "another-resource",
  });

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
    send("my-request", { dummy: "Im sending request" })
      // always handle the error in case it couldn't be sent
      .catch(console.error);

    // Send a request to a different resource than the provider
    sendToResource("another-request", { dummy: true }).catch(console.error);
  }, [send, sendToResource]);

  const stringResponse = JSON.stringify(response);

  return (
    <div className={styles.ExampleClass}>
      <pre>{JSON.stringify(dataState)}</pre>
      <pre>{loading && <span>Loading...</span>}</pre>
      <pre>Response: {stringResponse || ""}</pre>
      {error && <pre>{(error as any).message}</pre>}
      <pre>
        <button onClick={() => fetchSomething({ dummy: 2 })}>
          fetch something again
        </button>
      </pre>
    </div>
  );
}
