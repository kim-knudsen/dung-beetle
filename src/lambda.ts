import awsLambdaFastify from '@fastify/aws-lambda'
import { createServer } from './server.js'

export const handler = async (event: unknown, context: unknown) => {
    const server = await createServer()
    const proxy = awsLambdaFastify(server)

    return proxy(event, context)
}
