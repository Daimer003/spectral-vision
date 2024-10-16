import { Box, Text } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import { useRef, useEffect, useState } from "react";

interface CardProps {
  image: string;
}

const Card = ({ image }: CardProps) => {
  const cardRef = useRef<any>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const title = 'Titulo de la historia';

  const handleShare = async () => {
    const canvas = await html2canvas(cardRef.current, {
      useCORS: true, // Asegúrate de que los recursos de imagen se carguen correctamente
      allowTaint: true, // Permitir que las imágenes taint, útil si hay recursos de dominios cruzados
    });
    const dataUrl = canvas.toDataURL('image/png');
  
    // Crear un enlace para descargar la imagen
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'card-image.png'; // Nombre del archivo descargado
    document.body.appendChild(link); // Añadir el enlace al DOM
    link.click(); // Simular un clic en el enlace
    document.body.removeChild(link); // Eliminar el enlace del DOM
  };

  // Esta función se llama cuando la imagen se ha cargado
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Box
    display="flex"
    w="100%"
    maxW="500px"
    flexDir="column"
    bg="rgba(255, 255, 255, 1)" // Cambia a un color sólido si es necesario
    borderRadius="20px"
    border="1px solid #520000"
    overflow="hidden"
    position="relative"
    >
      <Box display="flex" w="100%" flexDir="column" ref={cardRef}>
        <Box>
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

        <Box w="100%" padding={3}>
          <Text as="h3" color='black'>{title}</Text>
          <Text as="p" color='black'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat et
            pariatur repellat qui ad dignissimos vero nemo. Tenetur velit odio
            distinctio, ex corporis culpa? Sit vel porro distinctio repellat
            rerum?
          </Text>
        </Box>
      </Box>

      {isImageLoaded && (
        <button onClick={handleShare}>Descargar como Imagen</button>
      )}

    </Box>
  );
};

export default Card;