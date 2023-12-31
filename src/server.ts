import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify from 'fastify'
import { swaggerRoutes } from './routes/swagger-routes.js'
import { wrestlerRoutes } from './routes/wrestler-routes.js'

export async function createServer() {
    const server = fastify({
        logger: true
    }).withTypeProvider<TypeBoxTypeProvider>()

    const { STAGE = '' } = process.env

    await server.register(swaggerRoutes, { prefix: STAGE })

    await server.register(wrestlerRoutes, {
        prefix: `v0.1/wrestler`
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
