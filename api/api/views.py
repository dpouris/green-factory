
import json
from PIL import Image
from rest_framework.decorators import api_view
from rest_framework.response import Response

import numpy as np

def calculate_mean(image):
    # mean_rgb = np.zeros(3)

    # Calculate mean of each channel
    mean = np.mean(image, axis=(0, 1))

    return mean

@api_view(["POST"])
def get_mean(request):
    img_array = json.loads(request.data["image"])

    image_RGB = np.array(img_array)
    image = Image.fromarray(image_RGB.astype("uint8")).convert("RGB")
    image.save("image.jpg")

    color = calculate_mean(image_RGB)

    # Reshape the array into a 1x1x3 shape
    color = color.reshape((1, 1, 3))

    # Plot the color using imshow
    return Response({"mean": color.tolist()[0][0]})