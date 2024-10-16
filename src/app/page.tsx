"use client";

import styles from "./page.module.css";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import Audio from "@/components/audio";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Card from "@/components/cards";
import Layaut from "@/components/layout";
import WarningModal from "@/components/modal";
const spectreImage = "espectros/tffiwpolmhawkgysiy7j";

export default function Home() {
  const [urlTransform, setUrlTransform] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialPlay, setInitialPlay] = useState<boolean>(false)

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
              tint: "40:#520000:gray:black",
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
      tint: "70:#520000:gray:black",
    });

    setUrlTransform(transformedImageUrl);
    console.log("Transformed Image URL:", transformedImageUrl);
  };

  //cierra el modal y reproduce el audio
  const initialAudio = () => {
    setInitialPlay(true)
    onClose();
  };

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <Layaut>
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        gap="20px"
        maxW="600px"
      >
        <h1 className="title">SpectralVision</h1>

        <Text as="p" textAlign="center" color="white">
          ⚠️ **Advertencia:** Esta aplicación puede revelar presencias que no
          son visibles a simple vista. Usa bajo tu propio riesgo. No nos hacemos
          responsables de los posibles encuentros paranormales que puedas
          experimentar. 👻
        </Text>

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
              <button onClick={() => open()} className={styles.buttonscan}>
                Detectar Presencias
              </button>
            );
          }}
        </CldUploadWidget>
      </Box>

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

      <Audio play={initialPlay} />
      <WarningModal isOpen={isOpen} onOpen={onOpen} onClose={initialAudio} />
    </Layaut>
  );
}
