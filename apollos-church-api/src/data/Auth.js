import { AuthenticationError, UserInputError } from 'apollo-server';
import { fetch, Request } from 'apollo-server-env';
import { Auth } from '@apollosproject/data-connector-rock';
import jwt from 'jsonwebtoken';

const { schema, resolver, contextMiddleware } = Auth;

class dataSource extends Auth.dataSource {
  getCurrentPerson = async ({ cookie = null } = { cookie: null }) => {
    const { rockCookie, currentPerson } = this.context;
    const userCookie = cookie || rockCookie;
    if (currentPerson) {
      return currentPerson;
    }
    if (userCookie) {
      try {
        const request = await this.request('People/GetCurrentPerson').get({
          options: {
            headers: { cookie: userCookie, 'Authorization-Token': null },
          },
        });
        this.context.currentPerson = request;
        return request;
      } catch (e) {
        const person = await this.lookupUserFromCache({ userCookie });
        if (!person) {
          throw new AuthenticationError(e);
        }
        // TODO: Send over a new cookie to be stored in the `set-cookie` header.
        return person;
      }
    }
    throw new AuthenticationError('Must be logged in');
  };

  // fetchUserCookie = async (Username, Password) => {
  // try {
  /// / We use `new Response` rather than string/options b/c if conforms more closely with ApolloRESTDataSource
  /// / (makes mocking in tests WAY easier to use `new Request` as an input in both places)
  // const response = await fetch(
  // new Request(`${this.baseURL}/Auth/Login`, {
  // method: 'POST',
  // body: JSON.stringify({
  // Username,
  // Password,
  // Persisted: true,
  // }),
  // headers: {
  // 'Content-Type': 'Application/Json',
  // },
  // })
  // );
  // if (response.status >= 400) throw new AuthenticationError();
  // const rawCookies = response.headers.raw()['set-cookie'];
  /// / mmmmm let's bake the cookies 🍪
  /// / Cookies might have extra data in them past the ';', so we need to strip them out.
  /// / This is a simplification of the function found in https://stackoverflow.com/a/55680330
  // const cookie = rawCookies.map((c) => c.split(';')[0]).join(';');
  // return cookie;
  // } catch (err) {
  // throw new AuthenticationError('Invalid Credentials');
  // }
  // };
  // createSession = async ({ cookie }) => {
  // const currentUser = await this.getCurrentPerson({ cookie });
  // return this.post('/InteractionSessions', {
  // PersonAliasId: currentUser.primaryAliasId,
  // });
  // };
  // authenticate = async ({ identity, password }) => {
  /// / const { Cache } = this.context.dataSources;
  // try {
  // const cookie = await this.fetchUserCookie(identity, password);
  // const sessionId = await this.createSession({ cookie });
  // const token = jwt.sign({ cookie, sessionId }, 'ASea$2gadj#asd0', {
  // expiresIn: '400d',
  // });
  // this.context.rockCookie = cookie;
  // this.context.userToken = token;
  // this.context.sessionId = sessionId;
  /// / Cache.set({
  /// / key: `:userLogins:${crypto
  /// / .createHash('sha1')
  /// / .update(cookie)
  /// / .digest('hex')}`,
  /// / data: identity,
  /// / expiresIn: 31556952, // one year
  /// / });
  // return { token, rockCookie: cookie };
  // } catch (e) {
  // if (e instanceof AuthenticationError) {
  // throw new UserInputError('Username or Password incorrect');
  // }
  // throw e;
  // }
  // };
}

export { schema, resolver, dataSource, contextMiddleware };
