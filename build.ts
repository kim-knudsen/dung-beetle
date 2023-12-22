import { build } from 'esbuild'
import { copy } from 'esbuild-plugin-copy'
import textReplace from 'esbuild-plugin-text-replace'

await build({
    bundle: true,
    entryPoints: ['src/lambda.ts'],
    outdir: 'dist',
    outbase: 'src/',
    sourcemap: 'inline',
    platform: 'node',
    format: 'esm',
    target: 'es2022',
    outExtension: { '.js': '.mjs' },
    banner: {
        js: "const require = (await import('node:module')).createRequire(import.meta.url);const __filename = (await import('node:url')).fileURLToPath(import.meta.url);const __dirname = (await import('node:path')).dirname(__filename);"
    },
    plugins: [
        copy({
            resolveFrom: 'cwd',
            assets: {
                from: ['node_modules/@fastify/swagger-ui/static/*'],
                to: ['dist/static']
            }
        }),
        // HACK: https://github.com/fastify/fastify-swagger-ui/issues/65#issuecomment-1857023801
        // @ts-ignore
        textReplace({
            include: /node_modules\/@fastify\/swagger-ui\/lib\/routes\.js$/,
            pattern: [[`'\.\.'`, `'.'`]]
        })
    ]
})
