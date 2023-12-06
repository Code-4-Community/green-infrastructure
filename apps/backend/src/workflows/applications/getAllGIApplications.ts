/**
 * 
 * @param scanAllGIApplications 
 * @returns All GI Applications in the DB 
 */

/**
   * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
   */
  async function getAllGIApplications(
    scanAllGIApplications: () => Promise<unknown[]>
  ) {
    try {
      return scanAllGIApplications();
    } catch (e) {
      console.error(e);
      throw new Error('Could not get GI applications');
    }
  }

  export default getAllGIApplications;