/**
 * Filters to apply on queries using a uniqueIdentifier
 * uniqueIdentifiers are restricted to be numbers right now
 */
 export type ApplicationFilters = {
    tableName: string,
    uniqueIdentifier: number
}