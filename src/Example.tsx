import styles from "./Example.module.css";
import { useEffect, useState } from "react";
import {
  useNuiEvent,
  useNuiEventCallback,
  useNuiRequest,
} from "fivem-nui-react-lib";

interface MethodExampleResponse {
  dummy: unknown;
}

interface FetchSomethingInput {
  dummy: unknown;
}

export function Example() {
  const [dataState, setDataState] = useState<MethodExampleResponse>();

  const { send } = useNuiRequest();

  useNuiEvent("appname", "methodname", setDataState);

  const [fetchSomething, { loading, error, response }] = useNuiEventCallback<
    FetchSomethingInput,
    MethodExampleResponse
  >("appname", "fetchSomething");

  useEffect(() => {
    fetchSomething({ dummy: 1 });
  }, [fetchSomething]);

  useEffect(() => {
    // Just a request sent to client, no loading, no response.
    send("my-request", { dummy: "Im sending request" });
  }, [send]);

  return (
    <div className={styles.ExampleClass}>
      <pre>{JSON.stringify(dataState)}</pre>
      <pre>
        {loading ? (
          <span>Loading...</span>
        ) : (
          JSON.stringify(response) || <span />
        )}
      </pre>
      {error && <pre>Unexpected Error!</pre>}
    </div>
  );
}
