/**
 * An Application is a Object of the shape:

{
    "appId": 2,
    "address": "1022 Fake Street, Boston, MA, 02118",
    "content": "This is a test2",
    "email": "test@example.com",
    "firstName": "Johnny",
    "lastName": "Test",
    "phone": "1111111111"
}

 */

/**
 * @param scanAllPractitioners {() => Practitioner[]} An effectful function that queries a database and produces all saved practitioners
 */
async function postApplication(postApplicationToDB, data) {
  try {
    return postApplicationToDB(data);
  } catch (e) {
    console.error(e);
    throw new Error('Could not post application');
  }
}

export default postApplication;
