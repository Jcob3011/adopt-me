export interface AttachmentDto {
    id: string
    originalFileName: string
    name: string
    description: string
    size: number
    extension: string
    createdOn: Date
    createdById: string
    deletedOn?: Date
    deletedById?: string
}