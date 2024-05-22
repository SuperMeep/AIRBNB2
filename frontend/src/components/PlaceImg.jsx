import Image from "./Image.jsx";

export default function PlaceImg({
  place,
  index = 0,
  className = "object-cover",
}) {
  if (
    !Array.isArray(place.image) ||
    place.image.length === 0 ||
    !place.image[index] ||
    !place.image[index].public_id
  ) {
    return null; // Return null if place.image is not an array, empty, or if the public_id is missing
  }

  return (
    <Image
      className={className}
      publicId={place.image[index].public_id}
      alt=""
    />
  );
}
