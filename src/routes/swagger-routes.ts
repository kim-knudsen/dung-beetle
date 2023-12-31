import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'
import { Wrestler } from '../types/wrestler-types.js'
import { assertIsDefined } from '../utils/assertions.js'

const DOCUMENTATION_PATH = '/docs'

export const swaggerRoutes = fp(async function (fastify: FastifyInstance) {
    const { HOST, SCHEME } = process.env

    assertIsDefined(HOST, 'HOST')
    assertIsDefined(SCHEME, 'SCHEME')

    fastify.get('/', {
        schema: {
            hide: true
        },
        handler: (request, reply) => {
            reply.redirect(DOCUMENTATION_PATH)
        }
    })

    await fastify.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Dung Beetle',
                description:
                    'A pet project REST API that provides unique and hilarious wrestler personas, catchphrases, and finishing moves.',
                version: '0.1.0'
            },
            host: HOST,
            schemes: [SCHEME],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [],
            definitions: {
                Wrestler
            }
        }
    })

    await fastify.register(fastifySwaggerUi, {
        routePrefix: DOCUMENTATION_PATH,
        logo: {
            content: Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
                'base64'
            ),
            type: 'image/png'
        }
    })
})
