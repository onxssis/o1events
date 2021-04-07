interface BaseModel {
  id: number
  createdAt: string
  updatedAt: string
}

export enum EventType {
  online = 'online',
  person = 'person',
}

export interface IUser extends BaseModel {
  name: string
  email: string
  isAdmin: boolean
  avatar: string
  initials: string
}

export interface IEvent extends BaseModel {
  title: string
  slug: string
  description: string
  address: string
  lng: number
  lat: number
  cover: string | null
  premium: boolean
  startDate: string
  endDate: string
  price: number
  type: EventType
  categories: any[]
  organizer: IUser
  reservations: [
    {
      id: string
      user: IUser
    }
  ]
}

export interface IEventDto {
  title: string
  description: string
  address?: string
  lng?: number
  lat?: number
  cover?: string | null
  premium?: boolean
  startDate: string
  endDate: string
  price?: number
  type?: EventType | string
  categories: any[]
  availableSlots?: number
  link?: string
}
export interface ICategory extends BaseModel {
  name: string
  slug: string
  description: string | null
}

export interface ICategoryDto {
  name: string
  description?: string
  cover?: string
}
