import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import ButtonPrimary from "@/components/button";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Card from "@/components/cards";

const spectreImage = {
  path: "espectros/dadiignwxptjv4yp1cjm",
  posX: 800,
  posY: 0,
};
const spectreImage2 = {
  path: "espectros/tffiwpolmhawkgysiy7j",
  posX: 50,
  posY: 300,
};

const Cloudinary = () => {
  const [urlTransform, setUrlTransform] = useState<string>("");

  const getRandomSpectreImage = () => {
    const images = [spectreImage, spectreImage2];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  const handleTransformation = (results: any) => {
    const publicId = results.info.public_id;

    const  { posX, posY, path } = getRandomSpectreImage()
    console.log(posX, posY, path );

    // Definir la transformación que deseas aplicar
    const transformedImageUrl = getCldImageUrl({
      width: 900,
      height: 600,
      src: publicId,
      crop: "fill",
      overlays: [
        {
          publicId: path,
          width: 400,
          height: 400,
          position: {
            x: posX,
            y: posY,
            gravity: "north_west",
          },
          appliedEffects: [
            {
              multiply: false,
              tint: "40:red:gray:black",
            },
          ],
          effects: [
            {
              opacity: 20,
            },
          ],
        },
      ],
      gravity: "custom", // Colocar el espectro en una posición
      tint: "50:red:green:gray",
    });

    setUrlTransform(transformedImageUrl);
  };

  return (
    <Box
      display="flex"
      flexDir="column"
      alignItems="center"
      gap="20px"
      w="100%"
    >
      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary-params"
        onSuccess={(results) => {
          handleTransformation(results); // Llamar a la función de transformación aquí
        }}
        options={{
          maxFiles: 1,
          sources: ["camera"], // Solo habilita la cámara
          styles: {
            background: "black",
          },
        }}
      >
        {({ open }) => {
          return (
            <Box
              display="flex"
              justifyContent="center"
              w="100%"
              position="absolute"
              bottom={10}
              padding={3}
            >
              <ButtonPrimary onClick={() => open()}>
                Detectar Presencias
              </ButtonPrimary>
            </Box>
          );
        }}
      </CldUploadWidget>

      {urlTransform.length > 0 ? (
        <Card image={urlTransform} />
      ) : (
        <Box w="100%" maxW="700px" borderRadius="20px">
          <img
            src="/assets/image5.webp"
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="Card Image"
            className="rotating-image"
          />
        </Box>
      )}
    </Box>
  );
};

export default Cloudinary;
