import axios from "axios";

const PYTHON_URL = "http://localhost:8000";
const JAVA_URL = "http://localhost:8080"
const WS_URL = "ws://localhost:8000/ws/predict";

const buildUrlPython = (api: string) => `${PYTHON_URL}/${api}`;
const buildUrlJava = (api: string) => `${JAVA_URL}/${api}`

export async function getDataPhoto(api: string, formData: FormData) {
    const response = await axios.post(buildUrlPython(api), formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
}

export type EmotionResponse = {
    emotion: string;
    probabilities: Record<string, number>;
};

let socket: WebSocket | null = null;

export function connectEmotionWS(onMessage: (data: EmotionResponse) => void) {
    if (socket) return;

    socket = new WebSocket(WS_URL);

    socket.onmessage = (event) => {
        onMessage(JSON.parse(event.data));
    };

    socket.onclose = () => {
        socket = null;
    };

    socket.onerror = () => {
        socket?.close();
    };
}

export function sendFrameToWS(base64Image: string) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(base64Image);
    }
}

export function disconnectEmotionWS() {
    socket?.close();
    socket = null;
}


export type SaveEmotionPayload = {
    dominantEmotion: string;
    probabilities: Record<string, number>;
};

export async function saveEmotionResult(payload: SaveEmotionPayload) {
    const response = await axios.post("api/emotions", payload, {
        headers: {
            "Content-Type": "application/json",
        },
    }
    );

    return response.data;
}
