import { gen } from './names.js'

async function main() {
    const response = gen()

    console.log(response)
}

main().catch(console.error)
