import { FastifyInstance, FastifyPluginCallback, FastifySchema } from 'fastify'
import { db } from '../storage/db.js'
import { Wrestler } from '../types/wrestler-types.js'

const ransomWrestlerSchema: FastifySchema = {
    description: 'Get a random wrestler',

    response: {
        200: Wrestler
    }
}

export const wrestlerRoutes: FastifyPluginCallback = (fastify: FastifyInstance, options, done) => {
    fastify.get('/random', { schema: ransomWrestlerSchema }, async (request, reply) => {
        return db.random()
    })

    done()
}
