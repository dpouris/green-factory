const convertTo3DArray = (
    width: number,
    height: number,
    uint8clampedarray: Uint8ClampedArray
  ) => {
    const imageArray = [];

    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const index = (y * width + x) * 4;
        const r = uint8clampedarray[index];
        const g = uint8clampedarray[index + 1];
        const b = uint8clampedarray[index + 2];
        row.push([r, g, b]);
      }
      imageArray.push(row);
    }

    return imageArray;
  };

export default convertTo3DArray