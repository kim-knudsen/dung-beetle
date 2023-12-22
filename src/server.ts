import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from 'fastify'
import { wrestlerRoutes } from './routes/wrestler-routes.js'
import { Wrestler } from './types/wrestler-types.js'

const DOCUMENTATION_PATH = '/docs'

export async function createServer() {
    const server = fastify({
        logger: true
    }).withTypeProvider<TypeBoxTypeProvider>()

    await server.register(fastifySwagger, {
        swagger: {
            info: {
                title: 'Test swagger',
                description: 'Testing the Fastify swagger API',
                version: '0.1.0'
            },
            externalDocs: {
                url: 'https://swagger.io',
                description: 'Find more info here'
            },
            host: 'localhost:3000',
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json'],
            tags: [],
            definitions: {
                Wrestler
            }
        }
    })

    await server.register(fastifySwaggerUi, {
        routePrefix: DOCUMENTATION_PATH,
        logo: {
            content: Buffer.from(
                'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC',
                'base64'
            ),
            type: 'image/png'
        }
    })

    server.register(wrestlerRoutes, {
        prefix: '/v0.1'
    })

    server.get('/', {
        schema: {
            hide: true
        },
        handler: (request, reply) => {
            reply.redirect(DOCUMENTATION_PATH)
        }
    })

    return server
}

if (process.argv.includes('--startServer')) {
    try {
        const server = await createServer()
        server.listen({ port: 3000 })
    } catch (error) {
        console.error(error)
    }
}
