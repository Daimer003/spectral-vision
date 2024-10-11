"use client";
import Image from "next/image";
import styles from "./page.module.css";
import img from "@/src/app/assets/bg2.png";
import { CldUploadWidget } from "next-cloudinary";

export default function Home() {
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

          <CldUploadWidget signatureEndpoint="/api/sign-cloudinary-params">
            {({ open }) => {
              return <button onClick={() => open()} className={styles.buttonscan}>Detectar Presencias</button>;
            }}
          </CldUploadWidget>
        </div>
      </main>
    </div>
  );
}
