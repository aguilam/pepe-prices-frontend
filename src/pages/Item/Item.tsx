import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Wrapper from "../../shared/ui/Wrapper/Wrapper";
export type MinecraftBarrel = {
  name: string;
  price: number;
  quantity: number;
  seller: string;
  x: number;
  y: number;
  z: number;
};

const Item: React.FC = React.memo(() => {
  const { categoryid, itemid } = useParams(); // Получаем параметры categoryId и itemId
  console.log(itemid);
  const { data, error, isLoading } = useQuery<MinecraftBarrel[]>({
    queryKey: ["fetchData", itemid],
    queryFn: async () => {
      const res = await fetch(`/api/neural/barrels?minecraft_id=${itemid}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
    staleTime: 6000000, // Данные актуальны в течение 60 секунд
    refetchOnWindowFocus: false, // Не обновлять данные при переключении вкладок
  });



  if (isLoading) return <p>Loading...</p>;

  if (error) {
    console.error(error); // Логирование ошибки для диагностики
    return <p>Error: {error.message}</p>;
  }

  console.log(itemid); // Проверьте структуру данных
  return (
    <div className=" grid grid-cols-3 gap-2">
      {data?.map((item, index) => (
        <Wrapper>
          <Link
            to={`/${categoryid}/${itemid}/${item.x}_${item.y}_${item.z}`}
            key={index}
            className=""
          >
            <h3 className="">{item.name}</h3>
            <p>{item.price} алмазов</p>
            <p>за {item.quantity}</p>
            <p>Продавец: {item.seller}</p>
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
  );
})

export default Item
