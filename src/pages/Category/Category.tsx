import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import Wrapper from "../../shared/ui/Wrapper/Wrapper";
export type MinecraftItem = {
  minecraft_id: string;
  name: string;
  typeId: string;
  typeRu: string;
  count: number;
};

const Category: React.FC = React.memo(() => {
  const { categoryid } = useParams();

  const { data, error, isLoading } = useQuery<MinecraftItem[]>({
    queryKey: ["fetchData", categoryid],
    queryFn: async () => {
      const res = await fetch(`api/neural/items?type=${categoryid}`);
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
    <div className=" grid grid-cols-3 gap-2 ">
      {data?.map((item, index) => (
        <Wrapper>
          <Link to={`/${categoryid}/${item.minecraft_id}`} key={index}>
            <p>{item.name}</p>
            <p>{item.count}</p>
          </Link>
        </Wrapper>
      ))}
    </div>
  );
});
export default Category;
