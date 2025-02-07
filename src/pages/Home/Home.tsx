import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import posthog from "posthog-js";
import Wrapper from "../../shared/ui/Wrapper/Wrapper";
import SearchBar from "../../shared/ui/SearchBar/SearchBar";
export type ItemType = {
  typeId: string;
  type: string;
  count: number;
};

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
const Home: React.FC = React.memo(() => {

  posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
      api_host: import.meta.env.VITE_POSTHOG_API_HOST,
      person_profiles: "always",
  });

  const { data, error, isLoading } = useQuery<ItemType[]>({
    queryKey: ["fetchData"],
    queryFn: async () => {
      const res = await fetch("api/neural/types");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: 6000000,
    refetchOnWindowFocus: false,
  });
  const [searchingData, setSearchingData] = useState<MinecraftBarrel[] | null>(
    null
  );

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }
  console.log(data);
  return (
    <div className=" flex flex-col items-center gap-5">
      <SearchBar setSearchResult={setSearchingData} />
      {searchingData ? (
        <div className=" grid grid-cols-3 gap-2 w-full">
          {searchingData?.map((item, index) => (
            <Wrapper>
              <Link
                to={`/${item.typeId}/${item.minecraft_id}/${item.x}_${item.y}_${item.z}`}
                key={index}
                className=""
              >
                <h3 className="">{item.name}</h3>
                <p>{item.price} алмаз(ов)</p>
                <p>за {item.quantity}</p>
                <div className="flex gap-2 items-center">
                  <p>Продавец: </p>
                  <div className=" flex gap-1 items-center">
                    <img
                      src={`https://crafthead.net/avatar/${item.sellerUUID}`}
                      width={16}
                      height={16}
                      alt=""
                      className=" w-4 h-4"
                    />
                    <p>{item.seller} </p>
                  </div>
                </div>
                <p>Координаты:</p>
                <p>
                  {item && item.x != null && item.y != null && item.z != null
                    ? `X: ${item.x} Y: ${item.y} Z: ${item.z}`
                    : "Нет данных о координатах"}
                </p>
              </Link>
            </Wrapper>
          ))}
        </div>
      ) : (
        <div className=" grid grid-cols-3 gap-2 w-full">
          {data?.map((item, index) => (
            <Wrapper key={index}>
              <Link
                to={`/${item.typeId}`}
                className=" min-h-[300px] min-w-[300px]"
              >
                <p>{item.type}</p>
                <p>{item.count}</p>
              </Link>
            </Wrapper>
          ))}
        </div>
      )}
    </div>
  );
});
export default Home;
