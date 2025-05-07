export interface LoggedUser {
    id: string
    firstName: string
    lastName: string
    email: string
    role: string
    status: string
    createdById: string
    createdOn: Date
    updateOn: Date
    attachment: Blob
}