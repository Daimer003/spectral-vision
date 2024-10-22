import { OpenAIStream } from 'ai';
import OpenAI from 'openai';

// Crear un cliente de OpenAI (compatible con edge)
const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY || '',
});

// Definir la función para manejar la solicitud POST
export async function POST(req) {
    try {
        const { messages } = await req.json();

        // Llamada al modelo de OpenAI para obtener un streaming de chat
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            stream: true,
            messages,
            max_tokens: 300,
        });

        // Convertir la respuesta a un stream amigable (ReadableStream)
        const stream = OpenAIStream(response);

        return new Response(stream, {
            headers: { 'Content-Type': 'text/event-stream' },
        });

    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        return new Response(JSON.stringify({ error: 'Error procesando la solicitud' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}