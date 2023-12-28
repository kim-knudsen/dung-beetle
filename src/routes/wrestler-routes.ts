import { Static, Type } from '@sinclair/typebox'
import { FastifyPluginCallback } from 'fastify'
import { db } from '../storage/db.js'
import { Wrestler } from '../types/wrestler-types.js'

const randomWrestlerQuerystring = Type.Object({
    name: Type.Optional(Wrestler.properties.name),
    nickName: Type.Optional(Wrestler.properties.nickName)
})

type RandomWrestlerQuerystring = Static<typeof randomWrestlerQuerystring>

const searchQuerystring = Type.Object({
    query: Type.String({ description: 'The search query', minLength: 3, maxLength: 30 })
})

type SearchQuerystring = Static<typeof searchQuerystring>

const wrestlerNotFoundError = Type.Object(
    { error: Type.String() },
    { description: 'When no wrestler matches the specified ID' }
)

export const wrestlerRoutes: FastifyPluginCallback = (fastify, options, done) => {
    fastify
        .get<{
            Querystring: RandomWrestlerQuerystring
        }>(
            '/random',
            {
                schema: {
                    description: 'Get a random wrestler',
                    querystring: randomWrestlerQuerystring,
                    response: {
                        200: Wrestler
                    }
                }
            },
            request => {
                const { name, nickName } = request.query
                const wrestler = { ...db.random() }

                if (name) {
                    wrestler.name = name
                }

                if (nickName) {
                    wrestler.nickName = nickName
                }

                return wrestler
            }
        )
        .get<{
            Params: {
                id: string
            }
        }>(
            '/:id',
            {
                schema: {
                    description: 'Get a wrestler by ID',
                    params: Type.Object({
                        id: Wrestler.properties.id
                    }),
                    response: { 200: Wrestler, 404: wrestlerNotFoundError }
                }
            },
            (request, reply) => {
                try {
                    return db.byId(request.params.id)
                } catch (error) {
                    console.error(error)
                    reply.code(404).send({ error: 'Wrestler not found' })
                }
            }
        )
        .get<{
            Querystring: SearchQuerystring
        }>(
            '/search',
            {
                schema: {
                    description: 'Performs a fuzzy wrestler search',
                    querystring: searchQuerystring,
                    response: {
                        200: Type.Array(Wrestler)
                    }
                }
            },
            request => {
                const { query } = request.query
                return db.search(query)
            }
        )

    done()
}
