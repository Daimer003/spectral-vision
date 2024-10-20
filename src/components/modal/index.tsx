import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import ButtonPrimary from "../button";

interface PropsModal {
  isOpen: any;
  onClose: any;
  onOpen: any;
}

const WarningModal = ({ isOpen, onClose }: PropsModal) => {
  const finalRef = useRef(null);

  const offModal = () => {
    console.log("Acepte la condiciones");
  };

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={offModal}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent bg="#030202" border="1px solid #520000" m={3}>
          <Box display="flex" justifyContent="center">
            <Image
              src="/assets/gato.webp"
              alt="Imagen del gato"
              width={200}
              height={200}
            />
          </Box>

          <ModalBody color="white">
            ⚠️ Atención: Esta aplicación no solo capta imágenes… a veces, lo que
            muestra podría estar más cerca de lo que crees. Si decides seguir
            adelante, lo haces bajo tu propio riesgo. No respondemos por sombras
            que se mueven solas, ruidos inexplicables, ni por las visitas
            inesperadas que podrías invitar sin querer. Usa con cuidado… no
            digas que no te lo advertimos. 🕯️👁️‍🗨️
            <Box display="flex" justifyContent="center" gap={3} marginTop={3}>

              <Box display="flex" alignItems="center" h="auto" gap="5px">
                <img
                  src="https://res.cloudinary.com/diccp2984/image/upload/v1725981015/samples/cloudinary-icon.png"
                  style={{
                    width: "40px",
                    height: "auto",
                  }}
                  alt="logo de cloudinay"
                />
                <Text
                  fontSize={{ base: "10px", md: "md" }}
                  as="span"
                  color="white"
                  fontWeight="600"
                >
                  Cloudinary
                </Text>
              </Box>

              <Box display="flex" alignItems="center" h="auto" gap="5px">
                <img
                  src="https://res.cloudinary.com/diccp2984/image/upload/v1729367628/logo/m4xnrjb9b6ygw83sqnq0.png"
                  style={{
                    width: "40px",
                    height: "auto",
                  }}
                  alt="logo de cloudinay"
                />
                <Text
                  fontSize={{ base: "10px", md: "md" }}
                  as="span"
                  color="white"
                  fontWeight="600"
                >
                  MiduDev
                </Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <ButtonPrimary onClick={onClose}>
              Acepto el encuentro paranormal
            </ButtonPrimary>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WarningModal;
