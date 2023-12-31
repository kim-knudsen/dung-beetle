export function getRandomElement<T>(items: ReadonlyArray<T>): T {
    return items[Math.floor(Math.random() * items.length)]
}
