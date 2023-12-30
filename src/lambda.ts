import awsLambdaFastify from '@fastify/aws-lambda'
import type { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { createServer } from './server.js'

export async function handler(event: APIGatewayProxyEvent, context: Context) {
    const server = await createServer()
    const proxy = awsLambdaFastify(server)

    return proxy(event, context)
}
