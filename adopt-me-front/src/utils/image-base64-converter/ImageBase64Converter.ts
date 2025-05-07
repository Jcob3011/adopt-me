export class ImageBase64Converter {

    static convertToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string
                resolve(result.split(",")[1]);
            };
            reader.readAsDataURL(file);
            reader.onerror = reject;
        })
}