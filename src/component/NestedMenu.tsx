import { useState } from "react";

export interface NestedMenuItem {
  name: string;
  children: NestedMenuItem[];
}

export type NestedMenuState = NestedMenuItem[];

type Path = number[]; // Represents the path to an item in the nested menu

export interface NestedMenuProps {
  state: NestedMenuState;
  onChangeState: (state: NestedMenuState) => void;
  maxDepth?: number;
}

const NestedMenu = ({
  state,
  onChangeState,
  maxDepth = 3,
}: NestedMenuProps) => {
  const [editingItem, setEditingItem] = useState<Path | null>(null);
  const [newItemName, setNewItemName] = useState("");

  /**
   *
   * @param index The path to the item to add a new child
   */
  const addItem = (path?: Path) => {
    const newItem: NestedMenuItem = { name: "New Item", children: [] };

    /**
     * It updates the state by adding a new item at the given path.
     * If the path is not provided, it adds a new item at the root level.
     */
    const updateState = (
      state: NestedMenuState,
      path?: Path
    ): NestedMenuState => {
      if (!path) return [...state, newItem];
      const [currentIndex, ...otherIndexes] = path;
      return state.map((item, i) => {
        if (i === currentIndex) {
          return otherIndexes.length > 0
            ? // If there are other indexes, we keep traversing the children
              { ...item, children: updateState(item.children, otherIndexes) }
            : // Otherwise, we add the new item to the children
              { ...item, children: [...item.children, newItem] };
        }
        return item;
      });
    };

    // Call the outer function to update the state
    onChangeState(updateState(state, path));
  };

  /**
   * Handles the change of the name for an item at the given path.
   *
   * @param path The path to the item to be updated
   * @param newName The new name to be set
   */
  const handleNameChange = (path: Path, newName: string) => {
    /**
     * Recursively updates the state by traversing the children and updating the name of the item.
     */
    const updateState = (
      state: NestedMenuState,
      path: Path
    ): NestedMenuState => {
      const [currentIndex, ...otherIndexes] = path;
      return state.map((item, i) => {
        if (i === currentIndex) {
          return otherIndexes.length > 0
            ? // If there are other indexes, we keep traversing the children
              { ...item, children: updateState(item.children, otherIndexes) }
            : // Otherwise, we update the name of the item
              { ...item, name: newName };
        }
        return item;
      });
    };

    // Call the outer function to update the state
    onChangeState(updateState(state, path));
  };

  const handleSubmit = (
    e: React.KeyboardEvent<HTMLInputElement>,
    itemPath: Path
  ) => {
    if (e.key === "Enter") {
      handleNameChange(itemPath, newItemName);
      setEditingItem(null);
    }
  };

  const renderNestedMenu = (items: NestedMenuItem[], path: Path = []) => {
    return (
      <ul>
        {items.map((item, i) => {
          const itemPath = [...path, i];
          return (
            <li key={i}>
              {editingItem && areSamePath(editingItem, itemPath) ? (
                <input
                  value={newItemName}
                  onChange={(e) => {
                    setNewItemName(e.target.value);
                  }}
                  onKeyDown={(e) => handleSubmit(e, itemPath)}
                  onBlur={() => setEditingItem(null)}
                  autoFocus
                />
              ) : (
                <span
                  onClick={() => {
                    setEditingItem(itemPath);
                    setNewItemName(item.name);
                  }}
                >
                  {item.name}
                </span>
              )}
              {path.length < maxDepth - 1 && (
                <button onClick={() => addItem(itemPath)}>Add Child</button>
              )}
              {item.children.length > 0 &&
                renderNestedMenu(item.children, itemPath)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <button onClick={() => addItem()}>Add Item</button>
      {renderNestedMenu(state)}
    </div>
  );
};

const areSamePath = (path1: Path, path2: Path) => {
  if (path1.length !== path2.length) return false;
  return path1.every((index, i) => index === path2[i]);
};

export default NestedMenu;
