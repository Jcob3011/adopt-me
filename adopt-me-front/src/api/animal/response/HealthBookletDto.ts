export interface HealthBookletDto{
    id:string
    sex:string
    health:boolean
    description:string
    admitted: Date,
    createdById: string
    deletedOn?: Date,
    deletedById?: string

}