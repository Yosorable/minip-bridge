export function arrayBufferToBase64(buffer: ArrayBuffer, offset: number = 0, length: number = 0): string {
    if (length === 0) {
        length = buffer.byteLength;
    }
    const arrayBuffer = (offset === 0 && length === buffer.byteLength) ? buffer : buffer.slice(offset, offset + length);
    let binary = '';
    const bytes = new Uint8Array(arrayBuffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}

export function base64SetToArrayBuffer(base64: string, buffer: ArrayBuffer, offset: number): number {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[offset + i] = binaryString.charCodeAt(i);
    }
    return binaryString.length;
}