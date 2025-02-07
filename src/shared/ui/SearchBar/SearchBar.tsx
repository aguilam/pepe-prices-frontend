import React, { useEffect } from "react";
import Input from "../Input/Input";
import { useQuery } from "@tanstack/react-query";
import ListBox from "../ListBox/ListBox";
import { useState } from "react";
async function fetchData(
  seller: string,
  name: string
): Promise<MinecraftBarrel[]> {
  const res = await fetch(`api/neural/barrels?seller=${seller}&name=${name}`);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }
  return res.json();
}
interface InputProps {
  className?: string;
  setSearchResult: React.Dispatch<
    React.SetStateAction<MinecraftBarrel[] | null>
  >;
}
export type MinecraftBarrel = {
  name: string;
  price: number;
  quantity: number;
  seller: string;
  sellerUUID: string;
  minecraft_id: string;
  typeId: string;
  x: number;
  y: number;
  z: number;
};
type option = {
  name: string;
  title: string;
};

const SearchBar: React.FC<InputProps> = React.memo(
  ({ className, setSearchResult }) => {
    const sortingType: option[] = [{ name: "alphabet", title: "По алфавиту" }];

    const [name, setName] = useState("");
    const [seller, setSeller] = useState("");
    const [selectedSortingType, setSelectedSortingType] = useState<option>(
      sortingType[0]
    );
    const { data, refetch } = useQuery<MinecraftBarrel[]>({
      queryKey: ["searching"],
      queryFn: () => fetchData(seller, name),
      enabled: false, // Do not fetch on render
      staleTime: 0,
    });

    useEffect(() => {
      if (data !== undefined) {
        setSearchResult(data); // Only set if data is not undefined
      }
    }, [data]); // This effect will run when `data` changes

    const handleSearch = () => {
      refetch();
    };
    const handleClearSearch = () => {
      setSearchResult(null);
      setName("");
      setSeller("");
    };

    return (
      <div className="flex flex-col bg-searchbar-bg items-center border-card-border-color rounded-xl w-fit pb-2">
        <div className=" flex items-center p-2 gap-3 ">
          <Input
            value={name}
            onChange={setName}
            className={className}
            placeholder="Название товара"
          />
          <Input
            value={seller}
            onChange={setSeller}
            className={className}
            placeholder="Продавец"
          />
          <label>Сортировка:</label>
          <ListBox
            options={sortingType}
            selected={selectedSortingType}
            setSelected={setSelectedSortingType}
          ></ListBox>
          <button className="bg-input-bg p-3 rounded-xl" onClick={handleSearch}>
            Поиск
          </button>
          <button
            className="bg-input-bg p-3 rounded-xl"
            onClick={handleClearSearch}
          >
            Сбросить
          </button>
        </div>
        <p className=" text-gray-400">
          Данные могут быть не точные и частично отличаться, не полагайтесь на
          них полностью
        </p>
      </div>
    );
  }
);

export default SearchBar;
