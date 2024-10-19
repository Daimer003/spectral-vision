import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { uploadImageToCloudinary } from "@/utils/uploadImage";

interface CardProps {
  image: string;
}

const Card = ({ image }: CardProps) => {
  const cardRef = useRef<any>(null);
  const myDivRef = useRef<HTMLDivElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [urlShare, setUrlShare] = useState<string>("");
  const { messages, handleSubmit, setInput, isLoading } = useChat({
    api: "/api/history", // Asegúrate de que esta ruta esté correctamente configurada
  });

  //Captura el componente para comvertirlo a una imagen
  const handleShare = async () => {
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: true,
    });

    // Convertir el canvas a blob para subirlo a Cloudinary
    canvas.toBlob(async (blob) => {
      if (blob) {
        // Llamar a la función que sube la imagen a Cloudinary
        const res = await uploadImageToCloudinary(blob);
        setUrlShare(res);
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

  useEffect(() => {
    const prompt =
      "Genera una historia de un espectro que trasmita terror, de no más de 150 caracteres, la historias siempre debe ser diferente a la anterior.";
    setInput(prompt);
  }, [handleSubmit, setInput]);

  //Cuando la imagen y el texto ya se cargaron guardo en cloudinary la imagen
  useEffect(() => {
    if (isImageLoaded && messages) {
      handleShare();
    }
  }, [isImageLoaded, isLoading]);

  return (
    <Box
      display="flex"
      w="100%"
      maxW="500px"
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
    >
      <Box display="flex" w="100%" flexDir="column">
        <Box
          display="flex"
          w="100%"
          alignItems="center"
          justifyContent="center"
          minH={{ base: "auto", md: "332px" }}
        >
          <img
            src={image}
            style={{
              width: "100%",
              height: "auto",
              aspectRatio: "100px",
              objectFit: "cover",
            }}
            onLoad={handleImageLoad}
            alt="Card Image"
          />
          {!isImageLoaded && (
            <Box w="50px" height="50px">
              <Spinner color="white" size="xl" />
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

      <Box
        display="flex"
        w="100%"
        h="60px"
        alignItems="center"
        justifyContent="center"
        gap={2}
        padding="10px 20px"
        bg="#000000ba"
      >
        <Box
          display="flex"
          alignItems="center"
          maxW="300px"
          w="100%"
          h="auto"
          gap="5px"
        >
          <img
            src="https://res.cloudinary.com/diccp2984/image/upload/v1725981015/samples/cloudinary-icon.png"
            style={{
              width: "40px",
              height: "auto",
            }}
            alt="logo de cloudinay"
          />
          <Text
            fontSize={{ base: "10px", md: "lg" }}
            as="span"
            color="white"
            fontWeight="600"
          >
            Cloudinary
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          maxW="300px"
          w="100%"
          h="auto"
          gap="5px"
        >
          <img
            src="https://res.cloudinary.com/diccp2984/image/upload/v1729367628/logo/m4xnrjb9b6ygw83sqnq0.png"
            style={{
              width: "40px",
              height: "auto",
            }}
            alt="logo de cloudinay"
          />
          <Text
            fontSize={{ base: "10px", md: "lg" }}
            as="span"
            color="white"
            fontWeight="600"
          >
            MiduDev
          </Text>
        </Box>
        <Box w="100%">
          <Button as="a" href={urlShare} target="_blank" w="100%">
            {" "}
            Compartir{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Card;
