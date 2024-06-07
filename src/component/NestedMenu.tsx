export interface NestedMenuItem {
  name: string;
  children: NestedMenuItem[];
}

export type NestedMenuState = NestedMenuItem[];

export interface NestedMenuProps {
  state: NestedMenuState;
}

const NestedMenu = ({ state }: NestedMenuProps) => {
  const renderNestedMenu = (items: NestedMenuItem[]) => {
    return (
      <ul>
        {items.map((item, i) => {
          return (
            <li key={i}>
              <span>{item.name}</span>
              {item.children.length > 0 && renderNestedMenu(item.children)}
            </li>
          );
        })}
      </ul>
    );
  };

  return <div>{renderNestedMenu(state)}</div>;
};

export default NestedMenu;
