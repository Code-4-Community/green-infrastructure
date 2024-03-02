import { ApplicationFilters } from "../filter";

  /**
   * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
   */
   async function getGISitesById(
    scanGISitesById: (filter: ApplicationFilters) => Promise<unknown>,
    filter : ApplicationFilters
  ) {
    try {
      return scanGISitesById(filter);
    } catch (e) {
      console.error(e);
      throw new Error('Could not get GI site details for site ID: ' + filter.uniqueIdentifier);
    }
  }

  export default getGISitesById;