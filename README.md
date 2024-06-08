# Nested Menu Component

This component can be useful if you need to show a nested list of items.

You can add, edit and remove items.

The component's state is an array of `NestedMenuItem` which is an object containing a name and a list of children.

## Usage

To run the `NestedMenu` component in development mode, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org) installed on your machine.

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

   This will start a Vite development server and open your application in the browser.

4. Make any necessary changes to the `NestedMenu` component and see the live updates in the browser.

## Test

To run tests:

```bash
npm run test
```

## How does it work?

The `NestedMenu` component recursively renders a nested menu using an unordered list. Each item in the menu can have children, enabling the creation of multi-level structure.

To optimize the performance of inserting and editing items, I have implemented an indexing system. Each item in the menu is assigned an array of indexes.

It also considers the depth of each item in the nested list, allowing for logic based on the depth. For example, it prevents the insertion of elements above level 3.

## Example component state

```json
[
  {
    "name": "Item 1",
    "children": [
      {
        "name": "Item 1.1",
        "children": []
      }
    ]
  },
  {
    "name": "Item 2",
    "children": []
  }
]
```

## Styling

The component comes with minimal styling. However, you can customize its appearance using the `nested-menu` class.
