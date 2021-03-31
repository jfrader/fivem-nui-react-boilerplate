import styles from "./Example.module.css";
import { useEffect, useState } from "react";
import { useNuiEvent, useNuiEventCallback } from "fivem-nui-react-lib";

interface MethodExampleResponse {
  dummy: unknown;
}

interface FetchSomethingInput {
  dummy: unknown;
}

export function Example() {
  const [methodnameResponse, setResponse] = useState<MethodExampleResponse>();

  useNuiEvent<MethodExampleResponse>("appname", "methodname", setResponse);

  const [
    fetchSomething,
    { loading, error, response: fetchSomethingResponse },
  ] = useNuiEventCallback<FetchSomethingInput, MethodExampleResponse>(
    "appname",
    "fetchSomething"
  );

  useEffect(() => {
    fetchSomething({ dummy: 1 });
  }, [fetchSomething]);

  return (
    <div className={styles.ExampleClass}>
      <pre>{JSON.stringify(methodnameResponse)}</pre>
      <pre>
        {loading ? "Loading..." : JSON.stringify(fetchSomethingResponse)}
      </pre>
      {error && <pre>Unexpected Error!</pre>}
    </div>
  );
}
