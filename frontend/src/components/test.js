import { FaCloudArrowUp } from "react-icons/fa6";
import React from "react";

export default function ImageUploader(props) {
  const handleImageChange = (e) => {
    const imageFiles = e.target.files;
    const previewImages = [];
    for (let i = 0; i < imageFiles.length; i++) {
      const imageFile = imageFiles[i];
      previewImages.push({
        file: imageFile,
        imageUrl: URL.createObjectURL(imageFile),
      });
    }
    props.setPlace({
      ...props.place,
      images: previewImages,
    });
  };

  return (
    <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {/* Display multiple image previews */}
      {props.place.images &&
        props.place.images.map((image, index) => (
          <div key={index} className=" h-45 flex relative">
            <img
              className="rounded-2xl w-full object-cover"
              src={image.imageUrl}
              alt={`Preview ${index + 1}`}
            />
          </div>
        ))}
      {/* Upload input */}
      <div className="cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl py-10 text-2xl text-gray-600">
        <FaCloudArrowUp className="w-9 h-9" />
        <input
          type="file"
          multiple
          className="hidden"
          // accept="image/"
          // id="photos"
          // name="photos"
          onChange={handleImageChange}
        />
        Upload
        {/* <input type="file" /> */}
      </div>
    </div>
  );
}
