import { Box, Spinner, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { uploadImageToCloudinary } from "@/utils/uploadImage";
import FooterCard from "./footerCard";

interface CardProps {
  image: string;
}

const Card = ({ image }: CardProps) => {
  const cardRef = useRef<any>(null);
  const myDivRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const [urlShare, setUrlShare] = useState<boolean>(true);

  const user = localStorage.getItem("User");
  const prompt = `Genera una historia de un espectro que transmita terror, de no más de 150 caracteres, la historias siempre debe ser diferente a la anterior. usa el siguiente nombre en la historia ${user}`;

  const { messages, handleSubmit, setInput } = useChat({
    api: "/api/history",
  });

  //Captura el componente para comvertirlo a una imagen
  const handleShare = async () => {
    setUrlShare(true);
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: true,
    });

    // Convertir el canvas a blob para subirlo a Cloudinary
    canvas.toBlob(async (blob) => {
      if (blob) {
        // Llamar a la función que sube la imagen a Cloudinary
        const res = await uploadImageToCloudinary(blob);

        // Abrir la URL de la imagen en una nueva pestaña
        if (res && !urlShare) {
          setUrlShare(false);
          window.open(res, "_blank");
        }
      }
    }, "image/png");
  };

  // Esta función se llama cuando la imagen se ha cargado
  const handleImageLoad = () => {
    setIsImageLoaded(true);
    // Crear un evento de formulario simulado
    const fakeEvent = new Event("submit", { bubbles: true, cancelable: true });
    // Simular el envío del formulario
    const formElement = document.createElement("form");
    formElement.dispatchEvent(fakeEvent);
    handleSubmit(fakeEvent as unknown as React.FormEvent<HTMLFormElement>);
  };

  //Inicia el contexto de la historia
  useEffect(() => {
    setInput(prompt);
  }, [handleSubmit, setInput]);

  useEffect(() => {
    if (messages && isImageLoaded) {
      setUrlShare(false);
    }
  }, [messages, isImageLoaded]);

  return (
    <Box
      display="flex"
      w="100%"
      maxW="420px"
      flexDir="column"
      bg="#000000"
      borderRadius="20px"
      border="1px solid #520000"
      overflow="hidden"
      position="relative"
      backgroundImage="/assets/bg.webp"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      ref={cardRef}
      marginTop={10}
    >
      <Box display="flex" w="100%" flexDir="column">
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="center"
          minH={{ base: "auto", md: "280px" }}
          position="relative"
        >
          <img
            src={image}
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              zIndex: "5",
            }}
            onLoad={handleImageLoad}
            alt="Card Image"
          />

          {!isImageLoaded && (
            <Box
              display="flex"
              w="60px"
              h="60px"
              position="absolute"
              zIndex={10}
            >
              <Spinner size="xl" />
            </Box>
          )}
        </Box>

        <Box w="100%" padding={3} p={3}>
          <Box
            w="100%"
            minH="140px"
            bg="rgba(0,0,0, .9)"
            borderRadius="16px"
            p={3}
            ref={myDivRef}
          >
            <Text as="h3" className="title-card ">
              Spectral vision
            </Text>
            <Text as="p" color="white">
              {messages
                .filter((m) => m.role == "assistant")
                .map((m) => (
                  <Box key={m.id}>{m.content}</Box>
                ))}
            </Text>
          </Box>
        </Box>
      </Box>

      <FooterCard handleShare={handleShare} urlShare={urlShare} />
    </Box>
  );
};

export default Card;
