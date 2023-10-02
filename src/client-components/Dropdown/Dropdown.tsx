"use client";
import { FC, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./dropdown.module.scss";
import Button from "../Button";

type DropdownProps = {
  options: string[];
  setQuery: Dispatch<SetStateAction<string>>;
};

const Dropdown: FC<DropdownProps> = ({ options, setQuery }) => {
  const [input, setInput] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    setInput(ev.target.value.toLowerCase());
    setQuery(ev.target.value.toLowerCase());
    console.log();
  };

  return (
    <select onChange={onChange} defaultValue={undefined}>
      <option disabled selected hidden>
        -- Filtrer Øl --
      </option>
      {options.map((opt) => (
        <option key={opt} value={input}>
          {opt}
        </option>
      ))}
      <option value={undefined}>-- Fjern filtrering --</option>
    </select>
  );
};

export default Dropdown;
