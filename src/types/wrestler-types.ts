import { Static, Type } from '@sinclair/typebox'

export const Wrestler = Type.Object({
    id: Type.String({ maxLength: 4, description: 'The wrestler ID' }),
    name: Type.String({ maxLength: 50, description: 'The wrestler name' }),
    nickName: Type.String({ maxLength: 50, description: 'The wrestler nickname' }),
    finisherMove: Type.String({ description: 'The wrestler finishing move' }),
    entranceMusic: Type.String({ description: 'The wrestler entrance music' }),
    catchPhrase: Type.String({ description: 'The wrestler catch phrase' })
})

export type Wrestler = Static<typeof Wrestler>
