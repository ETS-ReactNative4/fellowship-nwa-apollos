import { Auth } from '@apollosproject/data-connector-rock';
import { AuthenticationError } from 'apollo-server';

const {
  schema,
  resolver,
  registerToken,
  generateToken,
  contextMiddleware,
} = Auth;

class dataSource extends Auth.dataSource {
  getCurrentPerson = async ({ cookie = null } = { cookie: null }) => {
    const { rockCookie, currentPerson } = this.context;
    const userCookie = cookie || rockCookie;
    console.log(userCookie);

    if (currentPerson) {
      return currentPerson;
    }

    if (userCookie) {
      const request = await this.request('People/GetCurrentPerson').get({
        options: {
          headers: { cookie: userCookie, 'Authorization-Token': null },
        },
      });
      this.context.currentPerson = request;
      return request;
    }
    throw new AuthenticationError('No cookie in request context');
  };
}

export {
  schema,
  resolver,
  registerToken,
  generateToken,
  contextMiddleware,
  dataSource,
};
