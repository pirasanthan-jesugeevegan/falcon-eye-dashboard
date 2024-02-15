export function projectToValue(value: string): string {
    switch (value) {
        case 'List of Pull Request Results for coincover-b2b2c':
            return 'coincover_coincover-b2b2c'
        case 'List of Pull Request Results for coincover-txm':
            return 'coincover_coincover-txm'
        default:
            return value
    }
}
