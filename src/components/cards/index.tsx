import { Box, Button, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

import { useChat } from "ai/react";

interface CardProps {
  image: string;
}

const Card = ({ image }: CardProps) => {
  const cardRef = useRef<any>(null);
  const myDivRef = useRef<HTMLDivElement>(null);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { messages, handleSubmit, setInput, input, isLoading } = useChat({
    api: "/api/history", // Asegúrate de que esta ruta esté correctamente configurada
  });

  //Captura el componente para comvertirlo a una imagen
  const handleShare = async () => {
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true,
      allowTaint: true,
    });
    const dataUrl = canvas.toDataURL("image/png");

    // Crear un enlace para descargar la imagen
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "card-image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Esta función se llama cuando la imagen se ha cargado
  const handleImageLoad = () => {
    setIsImageLoaded(true);
    console.log("se llamo");
    // Crear un evento de formulario simulado
    const fakeEvent = new Event("submit", { bubbles: true, cancelable: true });
    // Simular el envío del formulario
    const formElement = document.createElement("form");
    formElement.dispatchEvent(fakeEvent);
    handleSubmit(fakeEvent as unknown as React.FormEvent<HTMLFormElement>);
  };

  useEffect(() => {
    const prompt =
      "Genera una historia de un espectro que trasmita terror, de no más de 150 caracteres";
    setInput(prompt);
  }, [handleSubmit, setInput]);

  return (
    <Box
      display="flex"
      w="100%"
      maxW="500px"
      flexDir="column"
      bg="#000000" // Cambia a un color sólido si es necesario
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
        <Box minH="332px">
          <img
            src={image}
            style={{
              width: "100%",
              height: "auto",
            }}
            onLoad={handleImageLoad} // Llama a handleImageLoad cuando la imagen se ha cargado
            alt="Card Image"
          />
        </Box>

        <Box w="100%" padding={3} p={3}>
          <Box
            w="100%"
            minH='140px'
            bg="rgba(0,0,0, .9)"
            borderRadius="16px"
            p={3}
            ref={myDivRef}
          >
            <Text as="h3" className="title-card ">
              Cloudinary
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

      {isImageLoaded && (
        <Button onClick={() => handleShare()} margin={3} bg="black">
          Descargar como Imagen
        </Button>
      )}
    </Box>
  );
};

export default Card;
