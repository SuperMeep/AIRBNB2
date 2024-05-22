export default function Image({ publicId, ...rest }) {
  // const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const baseUrl = `https://res.cloudinary.com/db1mvl67c/image/upload/`;

  const imageUrl = baseUrl + publicId;

  return <img {...rest} src={imageUrl} alt={""} />;
}
