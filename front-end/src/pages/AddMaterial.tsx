import React, { FormEvent, FormEventHandler, useState } from 'react'
import Camera from '../components/Camera'
import api from '../utilities/api'
import convertTo3DArray from '../utilities/utils'
import Mean from '../components/Mean'

type Props = {}

const AddMaterial = (props: Props) => {
    const [materialName, setMaterialName] = useState("")
    const [materialDesc, setMaterialDesc] = useState("")
    const [materialImageData, setMaterialImageData] = useState<ImageData>()
    const [mean, setMean] = useState({ mean: [0, 0, 0] })

    const addMaterial = async (e) => {
        e.preventDefault()
        const material = {
            name: materialName,
            description: materialDesc,
            mean: mean.mean
        }
        await api.addMaterial(material)
    }

    const handleCapture = async (imageData: ImageData) => {
        const image3DArray = convertTo3DArray(
        materialImageData?.width!,
        materialImageData?.height!,
        materialImageData?.data!
        );

        const formData = JSON.stringify(image3DArray);
        const data = await api.getMean(formData);
        setMean(data)
        setMaterialImageData(imageData)
    }

  return (
    <div className="">
        <h1>Add Material</h1>
        <form onSubmit={addMaterial}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={(e) => setMaterialName(e.target.value)}/>
            <label htmlFor="description">Description</label>
            <input type="text" name="description" id="description" onChange={(e) => setMaterialDesc(e.target.value)}/>
            <Camera onCapture={handleCapture} hideCaptured/>
            <Mean mean={mean}/>
            <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default AddMaterial