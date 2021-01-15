interface BaseModel {
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IEvent extends BaseModel {
  title: string
  slug: string
  description: string
  location: string
  lng: number
  lat: number
  cover: string | null
  premium: boolean
  startDate: Date
  endDate: Date
  price: number
  type: EventType
  categories: []
  reservations: []
}

export interface IEventDto {
  title: string
  description: string
  location: string
  lng?: number
  lat?: number
  cover?: string | null
  premium?: boolean
  startDate: Date
  endDate: Date
  price?: number
  type?: EventType
  categories?: []
}

export enum EventType {
  online = 'online',
  person = 'person',
}

export interface ICategory extends BaseModel {
  name: string
  slug: string
  description: string | null
}

export interface IUser extends BaseModel {
  name: string
  email: string
  isAdmin: boolean
}
