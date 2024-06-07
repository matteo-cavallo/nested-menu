import NestedMenu from "./component/NestedMenu";

const initialData = [
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
  return <NestedMenu state={initialData} />;
}

export default App;
