export default class AuthService {
  BASE_URL = 'http://localhost:5000';

  userAuthRequest = async (username, password) => {
    const res = await fetch(`${this.BASE_URL}/users?name=${username}`);
    if (!res.ok) {
      return undefined;
    }

    const response = await res.json();

    return new Promise((resolve, reject) => {
      const isValidPassword = this.checkPassword(
        response[0].password,
        password
      );

      if (isValidPassword) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  };

  checkPassword = (pass1, pass2) => {
    if (pass1 !== undefined) {
      return pass1 === pass2;
    } else {
      return false;
    }
  };
}
