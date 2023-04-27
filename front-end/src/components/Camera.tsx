import { useEffect, useRef, useState } from "react";
import {FaCamera} from "react-icons/fa";

type Props = {
  onCapture: (imageData: ImageData) => void;
  hideCaptured?: boolean;
};

const Camera = (props: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const capturedImageCanvasRef = useRef<HTMLCanvasElement>(null);

  const getCameraStream = async () => {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current!.srcObject = cameraStream;
  };

  useEffect(() => {
    getCameraStream();
  }, [])

  const captureImage = async () => {
    if (videoRef.current === null) {
      return;
    }
    if (capturedImageCanvasRef.current === null) {
      return;
    }

    const context = capturedImageCanvasRef.current!.getContext("2d");
    context?.drawImage(videoRef.current, 0, 0, 300, 225);
    const imageData = context?.getImageData(0, 0, 300, 225);

    props.onCapture(imageData!);
  };
  return (
    <div>
        <div className="relative">
            <div className="overflow-hidden rounded shadow-md w-fit">
                <video ref={videoRef} width={300} autoPlay muted playsInline></video>
            </div>
            <div onClick={captureImage} className="rounded-full shadow-lg bg-white p-3 absolute top-3 left-3 hover:bg-gray-200 cursor-pointer">
                <FaCamera className="scale-150"></FaCamera>
            </div>
        </div>
        <canvas ref={capturedImageCanvasRef} height={225} className={`${props.hideCaptured ? "hidden" : ""}`}></canvas>
    </div>
  );
};

export default Camera;
