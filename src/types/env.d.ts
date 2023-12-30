declare global {
    namespace NodeJS {
        interface ProcessEnv {
            HOST: string
            SCHEME: 'http' | 'https'
        }
    }
}
export {}
