import { faker } from "@faker-js/faker";

export function createRandomUser() {
  const username = faker.person.fullName();

  return {
    username,
    email: `${username.split(" ")[0]}@example.com`,
    avatar: faker.image.personPortrait({
      size: 128,
    }),
    // userprofile: {
    //   image:
    //     country:
    //   github_link:
    //   linkedin_link:

    // }
    token: {
      access: faker.internet.jwt(),
      refresh: faker.internet.jwt(),
    },
  };
}

export const users = (count: number = 1) => {
  return faker.helpers.multiple(createRandomUser, {
    count: count,
  });
};
