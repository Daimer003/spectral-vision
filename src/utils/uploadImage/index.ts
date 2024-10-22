
const url: string = process.env.NEXT_PUBLIC_CLOUDINARY_API as string
const cloudName: string = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string
const version: string = process.env.NEXT_PUBLIC_CLOUDINARY_VERSION as string
const uploadPreset: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
const apiKey: string = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string


export const uploadImageToCloudinary = async (imageBlob: Blob) => {

    try {
        // Obtener la firma desde tu backend
        const paramsToSign = {
            timestamp: Math.floor(Date.now() / 1000),
            upload_preset: uploadPreset, // Define tu preset aquí
        };

        const signatureResponse = await fetch("/api/sign-cloudinary-params", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paramsToSign }),
        });

        const { signature } = await signatureResponse.json();

        // Crear el FormData con la imagen y los parámetros
        const formData = new FormData();
        formData.append("file", imageBlob);
        formData.append("upload_preset", paramsToSign.upload_preset);
        formData.append("timestamp", paramsToSign.timestamp.toString());
        formData.append("signature", signature);
        formData.append("api_key", apiKey);

        const response = await fetch(
            `${url}/${version}/${cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await response.json();
        if (data.secure_url) {
            console.log("Image uploaded to Cloudinary: ", data.secure_url);
            // Aquí puedes tomar la URL para compartirla
            return data.secure_url
        }
    } catch (error) {
        console.error("Error uploading image to Cloudinary: ", error);
    }
};