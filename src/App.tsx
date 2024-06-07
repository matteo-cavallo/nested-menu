import { useEffect, useState } from "react";
import NestedMenu, { NestedMenuState } from "./component/NestedMenu";

const initialData: NestedMenuState = [
  {
    name: "Item 1",
    children: [
      {
        name: "Item 1.1",
        children: [],
      },
    ],
  },
  {
    name: "Item 2",
    children: [],
  },
];

function App() {
  const [state, setState] = useState(initialData);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return <NestedMenu state={state} onChangeState={setState} />;
}

export default App;
