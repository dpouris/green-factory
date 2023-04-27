import { useRef, useState } from "react";
import api from "../utilities/api";
import Mean from "../components/Mean";
import Camera from "../components/Camera";
import convertTo3DArray from "../utilities/utils";

type Props = {};

const CheckMaterial = (props: Props) => {
  const [mean, setMean] = useState({ mean: [0, 0, 0] });

  const onCapture = async (imageData: ImageData) => {
    const image3DArray = convertTo3DArray(
      imageData?.width!,
      imageData?.height!,
      imageData?.data!
    );

    const formData = JSON.stringify(image3DArray);
    const data = await api.getMean(formData);

    setMean(data);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <Camera onCapture={onCapture} hideCaptured></Camera>
        <Mean mean={mean} />
      </div>
    </>
  );
};

export default CheckMaterial;
