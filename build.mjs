import * as esbuild from 'esbuild'

await esbuild.build({
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
    }
})
