import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Box,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRef } from "react";
import styles from "../../app/page.module.css";


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
        <ModalContent bg="black" border="1px solid #520000">

          <Box display="flex" justifyContent="center">
            <Image
              src="/assets/gato.webp"
              alt="Imagen del gato"
              width={200}
              height={200}
            />
          </Box>

          <ModalBody>
            ⚠️ Atención: Esta aplicación no solo capta imágenes… a veces, lo que
            muestra podría estar más cerca de lo que crees. Si decides seguir
            adelante, lo haces bajo tu propio riesgo. No respondemos por sombras
            que se mueven solas, ruidos inexplicables, ni por las visitas
            inesperadas que podrías invitar sin querer. Usa con cuidado… no
            digas que no te lo advertimos. 🕯️👁️‍🗨️
          </ModalBody>

          <ModalFooter>
            <button className={styles.buttonscan} style={{marginTop:'10px'}} onClick={onClose}>
              Acepto el encuentro paranormal.
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WarningModal;
