import React from "react";
import {
  FaCloudUploadAlt,
  FaRegTrashAlt,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import PlaceImg from "./PlaceImg"; // Import PlaceImg component

const ImageUploader = ({ place, setPlace }) => {
  const handleImageChange = async (e) => {
    const imageFiles = e.target.files;
    const newImages = Array.from(imageFiles).map(async (file) => {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      imageData.append("folder", "upload");

      const response = await fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: "POST",
        body: imageData,
      });

      if (!response.ok) {
        throw new Error("Image upload failed");
      }

      const data = await response.json();
      return {
        id: null,
        file,
        public_id: data.public_id, // Save the public ID returned by Cloudinary
        imageUrl: data.secure_url,
      };
    });

    const images = await Promise.all(newImages);
    setPlace((prevPlace) => ({
      ...prevPlace,
      image: [...prevPlace.image, ...images],
    }));
  };

  const removePhoto = (index) =>
    setPlace({ ...place, image: place.image.filter((_, i) => i !== index) });

  const selectAsMainPhoto = (index) => {
    const newImages = [...place.image];
    const selectedImage = newImages.splice(index, 1)[0];

    setPlace({
      ...place,
      image: [selectedImage, ...newImages],
    });
  };

  return (
    <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {place.image.map((image, index) => (
        <div key={index} className="h-32 flex relative">
          <PlaceImg
            place={{ image: [{ public_id: image.public_id }] }}
            className="rounded-2xl w-full object-cover"
          />{" "}
          {/* Use PlaceImg to display the image */}
          <button
            type="button"
            className="cursor-pointer absolute bottom-1 right-1 text-white bg-red-500 rounded-full py-2 px-3"
            onClick={() => removePhoto(index)}>
            <FaRegTrashAlt />
          </button>
          <button
            type="button"
            className="cursor-pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-full py-2 px-3"
            onClick={() => selectAsMainPhoto(index)}>
            {index === 0 ? <FaStar /> : <FaRegStar />}
          </button>
        </div>
      ))}
      <label className="h-32 w-64 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-12 text-2xl text-gray-600">
        <FaCloudUploadAlt className="w-9 h-9" />
        <input
          type="file"
          multiple
          className="hidden"
          accept="image/*"
          id="photos"
          name="photos"
          onChange={handleImageChange}
        />
        Upload
      </label>
    </div>
  );
};

ImageUploader.uploadImages = async (images) => {
  const cloudinaryURL = process.env.REACT_APP_CLOUDINARY_URL;
  const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET;

  const updatedImages = await Promise.all(
    images.map(async (image) => {
      if (image.public_id) {
        return {
          public_id: image.public_id,
        };
      } else {
        const imageData = new FormData();
        imageData.append("file", image.file);
        imageData.append("upload_preset", uploadPreset);
        imageData.append("folder", "upload");

        const response = await fetch(cloudinaryURL, {
          method: "POST",
          body: imageData,
        });

        if (!response.ok) {
          throw new Error("Image upload failed");
        }

        const data = await response.json();
        return {
          public_id: data.public_id,
          url: data.secure_url,
        };
      }
    })
  );

  return updatedImages;
};

export default ImageUploader;
