import React, { useState, useEffect, useRef } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { Wrapper, Select, Content, Item } from "../styles/CustomSelect.styles";

interface Props<T> {
  selected: T | null;
  options: T[] | null;
  setSelected: React.Dispatch<React.SetStateAction<T | null>>;
  getLabel: (option: T) => string;
  name: string;
}

const CustomSelect = <T extends {}>({
  selected,
  options,
  setSelected,
  getLabel,
  name,
}: Props<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const node = useRef<HTMLDivElement | null>(null);

  const handleSelect = (option: T): void => {
    setSelected(option);
    setOpen(false);
  };

  const handleClick = (e: MouseEvent): void => {
    if (!node?.current?.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <Wrapper ref={node}>
      <span>{name}</span>
      <Select onClick={() => setOpen((prev) => !prev)}>
        {options && selected ? getLabel(selected) : "loading..."}
        <AiFillCaretDown style={{ flexShrink: "0" }} />
      </Select>
      {open && (
        <Content>
          {options?.map((option) => (
            <Item key={getLabel(option)} onClick={() => handleSelect(option)}>
              {getLabel(option)}
            </Item>
          ))}
        </Content>
      )}
    </Wrapper>
  );
};

export default CustomSelect;
