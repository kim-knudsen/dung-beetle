import Fastify from 'fastify'
import { realpathSync } from 'fs'
import { pathToFileURL } from 'url'

export function createServer() {
    const fastify = Fastify({
        logger: true
    })

    fastify
        .get('/', function handler(request, reply) {
            return { hi: 'mom' }
        })
        .get('/hello', function handler(request, reply) {
            return { hello: 'world' }
        })

    return fastify
}

// Called directly i.e. "node app"
if (isMainModule()) {
    try {
        await createServer().listen({ port: 3000 })
    } catch (error) {
        console.error(error)
    }
}

function isMainModule() {
    const realPath = realpathSync(process.argv[1])
    const realPathAsUrl = pathToFileURL(realPath).href

    return import.meta.url === realPathAsUrl
}
