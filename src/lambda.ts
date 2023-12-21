import awsLambdaFastify from '@fastify/aws-lambda'
import { createServer } from './server.js'

const server = createServer()

export const handler = awsLambdaFastify(server)
