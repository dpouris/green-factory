import { useEffect, useRef } from 'react'

type Props = {
    mean: Mean,
    className?: string
}

type Mean = {
    mean: number[]
}

const Mean = (props: Props) => {
const meanCanvasRef = useRef<HTMLCanvasElement>(null)

useEffect(() => {
    const meanContext = meanCanvasRef.current?.getContext('2d')
    const imageData2 = meanContext?.createImageData(300, 225)!
    for (let i = 0; i < imageData2.data.length; i += 4) {
      imageData2.data[i] = props.mean?.mean[0];     // Red
      imageData2.data[i + 1] = props.mean?.mean[1]; // Green
      imageData2.data[i + 2] = props.mean?.mean[2]; // Blue
      imageData2.data[i + 3] = 255; // Alpha (255 = fully opaque)
    }
    meanContext?.putImageData(imageData2, 0, 0)

}, [props.mean])

  return (
    <div className={props.className}>
        <canvas ref={meanCanvasRef} height={225}></canvas>
    </div>
  )
}

export default Mean