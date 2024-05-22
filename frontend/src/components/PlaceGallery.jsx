import { useState } from "react";
import Image from "./Image.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slick-custom.css"; // Import your custom CSS
import { FaImages } from "react-icons/fa";

export default function PlaceGallery({ place }) {
  const [showAllImage, setShowAllImage] = useState(false);

  if (!place || !place.image) {
    return null; // Return null if place or place.image is undefined
  }

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  if (showAllImage) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen flex flex-col items-center justify-center">
        <div className="bg-black p-8 w-full max-w-screen-lg max-h-screen overflow-auto">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="text-3xl">Images of {place.title}</h2>
            <button
              onClick={() => setShowAllImage(false)}
              className="flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
              <FaImages className="w-6 h-6" />
              Close images
            </button>
          </div>
          <Slider {...sliderSettings}>
            {place.image.length > 0 &&
              place.image.map((image, index) => (
                <div key={index} className="relative">
                  <Image
                    publicId={image.public_id}
                    alt={`Image ${index + 1}`}
                    className="w-full  h-[60vh] object-cover"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>
    );
  }

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div>
          {place.image?.[0] && (
            <div>
              <Image
                onClick={() => setShowAllImage(true)}
                className="aspect-square cursor-pointer object-cover"
                publicId={place.image[0].public_id} // Use publicId instead of src
                alt="Image 1"
              />
            </div>
          )}
        </div>
        <div className="grid">
          {place.image?.[1] && (
            <Image
              onClick={() => setShowAllImage(true)}
              className="aspect-square cursor-pointer object-cover"
              publicId={place.image[1].public_id} // Use publicId instead of src
              alt="Image 2"
            />
          )}
          <div className="overflow-hidden">
            {place.image?.[2] && (
              <Image
                onClick={() => setShowAllImage(true)}
                className="aspect-square cursor-pointer object-cover relative top-2"
                publicId={place.image[2].public_id} // Use publicId instead of src
                alt="Image 3"
              />
            )}
          </div>
        </div>
      </div>
      <button
        onClick={() => setShowAllImage(true)}
        className="flex gap-1 absolute bottom-2 right-2 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500">
        <FaImages className="w-6 h-6" />
        Show more images
      </button>
    </div>
  );
}
