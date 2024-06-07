import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";

import NestedMenu from "./NestedMenu";

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

describe("NestedMenu", () => {
  it("should render the initial data", () => {
    const { getByText } = render(<NestedMenu state={initialData} />);
    expect(getByText("Item 1")).toBeDefined();
    expect(getByText("Item 1.1")).toBeDefined();
    expect(getByText("Item 2")).toBeDefined();
  });
});
