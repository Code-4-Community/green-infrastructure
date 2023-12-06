/**
 * A Practitioner is a Object of the shape:
 {
    "phoneNumber": "123456789",
    "website": "https://ryanjung.dev",
    "languages": "French",
    "modality": "Software",
    "businessLocation": "Boston, MA",
    "businessName": "Code4Community",
    "minAgeServed": 18,
    "email": "myemail@gmail.com",
    "fullName": "Ryan Jung"
  }
 */

  import { Site } from '../../../../common/src/lib/dto/Site';

  /**
   * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
   */
  async function getAllSites(
    scanAllSites: () => Promise<unknown[]>
  ) {
    try {
      return scanAllSites();
    } catch (e) {
      console.error(e);
      throw new Error('Could not get sites');
    }
  }

  export default getAllSites;