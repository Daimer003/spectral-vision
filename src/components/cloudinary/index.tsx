import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import ButtonPrimary from "@/components/button";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Card from "@/components/cards";

const spectreImage = "espectros/tffiwpolmhawkgysiy7j";

const Cloudinary = () => {
  const [urlTransform, setUrlTransform] = useState<string>("");

  const handleTransformation = (results: any) => {
    const publicId = results.info.public_id;

    // Definir la transformación que deseas aplicar
    const transformedImageUrl = getCldImageUrl({
      width: 900,
      height: 600,
      src: publicId,
      crop: "fill",
      overlays: [
        {
          publicId: spectreImage,
          width: 400,
          height: 400,

          position: {
            x: 0,
            y: 300,
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
              opacity: 15,
            },
          ],
        },
      ],
      gravity: "custom", // Colocar el espectro en una posición
      tint: "50:red:green:gray",
    });

    console.log("URL TRANSFORM",transformedImageUrl)
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
            <ButtonPrimary onClick={() => open()}>
              Detectar Presencias
            </ButtonPrimary>
          );
        }}
      </CldUploadWidget>

      {urlTransform.length > 0 ? (
        <Card image={urlTransform} />
      ) : (
        <Box w="100%" maxW="500px" borderRadius="20px">
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
