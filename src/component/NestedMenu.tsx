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

  const renderNestedMenu = (items: NestedMenuItem[], path: Path = []) => {
    return (
      <ul>
        {items.map((item, i) => {
          const itemPath = [...path, i];
          return (
            <li key={i}>
              <span>{item.name}</span>
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

export default NestedMenu;
