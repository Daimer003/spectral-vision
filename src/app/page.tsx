"use client";
import Image from "next/image";
import styles from "./page.module.css";
import img from "../../public/assets/bg2.png";
import { CldUploadWidget, getCldImageUrl } from "next-cloudinary";
import Audio from "@/components/audio"

export default function Home() {


  const handleTransformation = (results: any) => {
    const publicId = results.info.public_id;
    // Definir la transformación que deseas aplicar
    const transformedImageUrl = getCldImageUrl({
      width: 600,
      height: 600,
      src: publicId,
      crop: "thumb",
      tint: "100:blue:green:red",
    });

    console.log("Transformed Image URL:", transformedImageUrl);

    // Aquí podrías usar la URL transformada en tu aplicación (mostrarla, enviarla a algún lugar, etc.)
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          src={img}
          className={styles.img}
          alt="Next.js logo"
          width={900}
          height={900}
          style={{
            width: "100%",
            height: "auto",
            objectFit: "cover",
          }}
          priority
        />
        <span className={styles.span} />

        <div className={styles.p}>
          <h1>SpectralVision</h1>

          <p>
            ⚠️ **Advertencia:** Esta aplicación puede revelar presencias que no
            son visibles a simple vista. Usa bajo tu propio riesgo. No nos
            hacemos responsables de los posibles encuentros paranormales que
            puedas experimentar. 👻
          </p>

          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary-params"
            onSuccess={(results) => {
              handleTransformation(results);  // Llamar a la función de transformación aquí
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
        </div>

        <Audio />
      </main>
    </div>
  );
}
