import {AttachmentApi} from "../AttachmentApi";
import axiosClient from "../../config/AxiosClient";
import {AttachmentDto} from "../response/AttachmentDto";
import {AttachmentImageResponse} from "../response/AttachmentImageResponse";
import {AxiosHeaders} from "axios";

export class AttachmentApiAxios implements AttachmentApi {
    download(id: string): Promise<Blob> {
        return axiosClient.get(`/attachment/download/${id}`, {
            responseType: 'blob'
        })
    }

    save(name: string, description: string, image: File): Promise<AttachmentDto> {
        return axiosClient.post("/attachment", {
            name: name,
            description: description,
            image: image
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    }
}