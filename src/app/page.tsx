"use client";
import Image from "next/image";
import styles from "./page.module.css";
import img from "../../public/assets/bg2.png";
import spectreImage2 from "../../public/assets/epec.webp";

import { CldUploadWidget, getCldImageUrl, CldImage } from "next-cloudinary";
import Audio from "@/components/audio";
import { Box, Button, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/cards";
const spectreImage = "espectros/xcv8q8jn9u6ewxyufoyc";

export default function Home() {
  const [urlTransform, setUrlTransform] = useState<string>("");
  const navigator = useRouter();

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
            y: 0,
            gravity: "north_west",
          },
          appliedEffects: [
            {
              multiply: false,
              tint: "60:black:green:red", // Aplicar efectos de color si es necesario
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
      tint: "70:red:gray:black", // Aplicar efectos de color si es necesario
    });

    setUrlTransform(transformedImageUrl);
    console.log("Transformed Image URL:", transformedImageUrl);

    //if(transformedImageUrl) navigator.push(transformedImageUrl)

    // Aquí podrías usar la URL transformada en tu aplicación (mostrarla, enviarla a algún lugar, etc.)
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <span className={styles.span} />

        <Box
          display="flex"
          alignItems="center"
          flexDir="column"
          w="100%"
          zIndex={10}
          gap={10}
          padding="20px"
        >
          <Box
            display="flex"
            flexDir="column"
            alignItems="center"
            gap="20px"
            maxW="600px"
          >
            <h1 className="title">SpectralVision</h1>

            <Text as="p" textAlign="center" color="white">
              ⚠️ **Advertencia:** Esta aplicación puede revelar presencias que
              no son visibles a simple vista. Usa bajo tu propio riesgo. No nos
              hacemos responsables de los posibles encuentros paranormales que
              puedas experimentar. 👻
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

          {urlTransform.length > 0 && <Card image={urlTransform} />}
        </Box>

        <Audio />
      </main>
    </div>
  );
}
