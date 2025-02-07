import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Wrapper from "../../shared/ui/Wrapper/Wrapper";
export type MinecraftData = {
  count: number;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    seller: string;
    x: number;
    y: number;
    z: number;
    createdAt: Date;
  }>;
};

const Barrel: React.FC = React.memo(() => {
  const { barrelcords } = useParams();
  console.log(barrelcords);
  let x = "0";
  let y = "0";
  let z = "0";
  if (barrelcords) {
    [x, y, z] = barrelcords.split("_");
  }
  const { data, error, isLoading } = useQuery<MinecraftData>({
    queryKey: ["fetchData", barrelcords],
    queryFn: async () => {
      const res = await fetch(
        `/api/neural/barrels/history?x=${x}&y=${y}&z=${z}`
      );
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: 6000000,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    console.error(error);
    return <p>Error: {error.message}</p>;
  }

  console.log(data);
  return (
    <div>
      {data?.items.map((item, index) => (
        <Wrapper key={index}>
          <h3 className=" ">{item.name}</h3>
          <p>{item.price} алмазов</p>
          <p>за {item.quantity}</p>
          <p>Продавец: {item.seller}</p>
          <p>Координаты:</p>
          <p>
            {item && item.x != null && item.y != null && item.z != null
              ? `X: ${item.x} Y: ${item.y} Z: ${item.z}`
              : "Нет данных о координатах"}
          </p>
          <p>{new Date(item.createdAt).toLocaleDateString("ru-RU")}</p>
        </Wrapper>
      ))}
    </div>
  );
})

export default Barrel