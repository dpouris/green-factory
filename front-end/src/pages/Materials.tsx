import { useEffect, useState } from "react";
import api from "../utilities/api";
import Mean from "../components/Mean";

type Props = {};

const Materials = (props: Props) => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await api.getMaterials();
      setMaterials(() =>
        data.map((material: any) => {
          return {
            id: material.id,
            name: material.name,
            description: material.description,
            mean: {mean: material.mean},
          };
        })
      );
    };
    getData();
  }, []);

  return (
    <div className="p-4 flex gap-4 justify-start overflow-scroll flex-wrap">
      {materials?.length > 0 && materials.map((material: any) => {
        return (
          <div key={material.id} className="border-black rounded bg-red-50 p-3 px-4 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105">
            <div className="flex justify-between p-2">
                <h1>{material.name}</h1>
                <p>{material.description}</p>
            </div>
            <Mean className="rounded overflow-hidden border-2 border-white" mean={material.mean}></Mean>
          </div>
        );
      })}
    </div>
  );
};

export default Materials;
