
import {AttachmentDto} from "./response/AttachmentDto";
import {AttachmentImageResponse} from "./response/AttachmentImageResponse";

export interface AttachmentApi {
    download(id: string): Promise<Blob>
    save(name: string, description: string, image: File): Promise<AttachmentDto>
}