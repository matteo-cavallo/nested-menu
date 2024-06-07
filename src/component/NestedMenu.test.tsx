import { describe, it, expect } from "vitest";
import { fireEvent, render } from "@testing-library/react";
import { useState } from "react";

import NestedMenu, { NestedMenuState } from "./NestedMenu";

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

const NestedMenuComponent = () => {
  const [state, setState] = useState(initialData);

  return <NestedMenu state={state} onChangeState={setState} />;
};

describe("NestedMenu", () => {
  it("should render the initial data", () => {
    const { getByText, unmount } = render(<NestedMenuComponent />);
    expect(getByText("Item 1")).toBeDefined();
    expect(getByText("Item 1.1")).toBeDefined();
    expect(getByText("Item 2")).toBeDefined();

    unmount();
  });

  it("should add a new item", () => {
    const { getByText, unmount } = render(<NestedMenuComponent />);
    fireEvent.click(getByText("Add Item"));

    expect(getByText("New Item")).toBeDefined();

    unmount();
  });

  it("should add a new child", () => {
    const { getAllByText, unmount } = render(<NestedMenuComponent />);
    fireEvent.click(getAllByText("Add Child")[0]);

    expect(getAllByText("New Item")).toBeDefined();

    unmount();
  });
});
