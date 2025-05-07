export interface TagDto {
    id: string
    name: string
    createdOn: Date,
    createdById: string
    updatedOn: Date
    deletedOn?: Date,
    deletedById?: string
}