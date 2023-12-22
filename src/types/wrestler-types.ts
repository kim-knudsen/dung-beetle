import { Static, Type } from '@sinclair/typebox'

export const Wrestler = Type.Object({
    id: Type.String(),
    name: Type.String(),
    nickName: Type.String(),
    finisherMove: Type.String(),
    entranceMusic: Type.String(),
    catchPhrase: Type.String()
})

export type Wrestler = Static<typeof Wrestler>
