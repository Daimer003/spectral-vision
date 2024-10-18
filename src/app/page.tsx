"use client";

import Audio from "@/components/audio";
import { Box, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Layaut from "@/components/layout";
import WarningModal from "@/components/modal";
import Cloudinary from "@/components/cloudinary";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [initialPlay, setInitialPlay] = useState<boolean>(false);

  //cierra el modal y reproduce el audio
  const initialAudio = () => {
    setInitialPlay(true);
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

        <Cloudinary />
      </Box>

      <Audio play={initialPlay} />
      <WarningModal isOpen={isOpen} onOpen={onOpen} onClose={initialAudio} />
    </Layaut>
  );
}
