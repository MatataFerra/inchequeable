const regex =
  "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$";

export const checkRegExp = (email: string): string | boolean => {
  try {
    const reg = new RegExp(regex);

    if (!reg.test(email)) {
      return false;
    }

    return email;
  } catch (err) {
    console.log(err);

    return false;
  }
};
