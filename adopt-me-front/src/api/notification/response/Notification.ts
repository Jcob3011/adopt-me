export interface Notification {
    id: string,
    email: string,
    firstName: string,
    lastName: string,
    sent: boolean,
    attempts: number,
    createdOn: Date,
    createdById: string,
    deletedOn?: Date,
    deletedById?: string
}