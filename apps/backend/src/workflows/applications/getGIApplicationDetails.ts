import { ApplicationFilters } from "./requestTypes/types";

  /**
   * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
   */
   async function getGIApplicationDetails(
    scanGIApplicationDetails: (filter: ApplicationFilters) => Promise<unknown>,
    filter : ApplicationFilters
  ) {
    try {
      return scanGIApplicationDetails(filter);
    } catch (e) {
      console.error(e);
      throw new Error('Could not get GI applications details for application ID: ' + filter.uniqueIdentifier);
    }
  }

  export default getGIApplicationDetails;