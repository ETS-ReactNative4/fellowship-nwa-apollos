import { AuthenticationError } from 'apollo-server';
import { Auth } from '@apollosproject/data-connector-rock';

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
        // CUSTOM: took out REDIS lookup stuff
        // const person = await this.lookupUserFromCache({ userCookie });

        // if (!person) {
        throw new AuthenticationError(e);
        // }
        // TODO: Send over a new cookie to be stored in the `set-cookie` header.
        // return person;
      }
    }
    throw new AuthenticationError('Must be logged in');
  };
}

export { schema, resolver, dataSource, contextMiddleware };
