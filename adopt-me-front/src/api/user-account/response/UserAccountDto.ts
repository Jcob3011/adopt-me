import {AttachmentDto} from "../../attachment/response/AttachmentDto";

export interface UserAccountDto {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    status: string
    createdById: string
    createdOn: Date,
    updatedOn: Date,
    deletedOn?: Date,
    deletedById?: string
    attachment?: AttachmentDto
}