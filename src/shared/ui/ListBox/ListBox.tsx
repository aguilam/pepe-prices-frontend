import React from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";

type option = {
  name: string;
  title: string;
};

interface ListProps {
  options: option[];
  selected: option;
  setSelected: React.Dispatch<React.SetStateAction<option>>;
}

const ListBox: React.FC<ListProps> = React.memo(
  ({ options, selected, setSelected }) => {
    return (
      <div className="">
        <Listbox value={selected} onChange={setSelected}>
          <ListboxButton
            className={clsx(
              "relative block w-40 rounded-lg bg-input-bg  py-2 pr-8 pl-3 text-left ",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            )}
          >
            {selected.title}
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            transition
            className={clsx(
              "w-[var(--button-width)] rounded-xl border border-white/5 bg-input-bg  p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none",
              "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
            )}
          >
            {options.map((option, index) => (
              <ListboxOption
                key={index}
                value={option}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
              >
                <div className=" text-white">{option.title}</div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      </div>
    );
  }
);

export default ListBox;
