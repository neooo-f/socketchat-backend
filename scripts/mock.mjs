import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

prisma.$connect();

const users = [
  {
    id: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    username: 'neoo.lf',
    password: await hash('k1h2g34j1h+2g3-412', 10),
    firstName: 'Neo',
    lastName: 'Fanetti',
    gender: 'MALE',
    dateOfBirth: new Date('2004-12-02').toISOString(),
    biography: "Hello, i'm using socketchat",
  },
  {
    id: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    username: 'larissa.tns',
    password: await hash('k1h2g34j1h+2g3-412', 10),
    firstName: 'Larissa',
    lastName: 'Tanaseda',
    gender: 'FEMALE',
    dateOfBirth: new Date('2004-12-08').toISOString(),
    biography: "Hello, i'm using socketchat",
  },
  {
    id: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
    username: 'remomaxime',
    password: await hash('k1h2g34j1h+2g3-412', 10),
    firstName: 'Remo',
    lastName: 'Kaufmann',
    gender: 'MALE',
    dateOfBirth: new Date('2004-08-02').toISOString(),
    biography: "Hello, i'm using socketchat",
  },
  {
    id: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
    username: 'yoshuaxx',
    password: await hash('k1h2g34j1h+2g3-412', 10),
    firstName: 'Yoshua',
    lastName: 'Salic',
    gender: 'MALE',
    dateOfBirth: new Date('2004-04-02').toISOString(),
    biography: "Hello, i'm using socketchat",
  },
];

const userConnections = [
  {
    fromUserId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    toUserId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    added: true,
    muted: true,
    blocked: false,
    archived: true,
  },
  {
    fromUserId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    toUserId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    added: true,
    muted: false,
    blocked: false,
    archived: false,
  },
  {
    fromUserId: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
    toUserId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    added: false,
    muted: false,
    blocked: true,
    archived: true,
  },
  {
    fromUserId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    toUserId: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
    added: true,
    muted: true,
    blocked: false,
    archived: false,
  },
];

const groups = [
  {
    id: 'd2e1e6bc-0d81-47db-a6b0-d4eccadc25c5',
    name: 'Gottlos GMBH',
    description: 'Wirrr müssen umbringen',
  },
  {
    id: '2b6c7789-729a-4870-af82-8135f9ead7f9',
    name: 'Jana Party',
  },
  {
    id: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
    name: 'Chill Boys',
    description: 'für immer mit der gaaaaang',
  },
];

const groupUsers = [
  {
    groupId: 'd2e1e6bc-0d81-47db-a6b0-d4eccadc25c5',
    userId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    isGroupAdmin: true,
  },
  {
    groupId: 'd2e1e6bc-0d81-47db-a6b0-d4eccadc25c5',
    userId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
  },
  {
    groupId: 'd2e1e6bc-0d81-47db-a6b0-d4eccadc25c5',
    userId: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
  },
  {
    groupId: 'd2e1e6bc-0d81-47db-a6b0-d4eccadc25c5',
    userId: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
  },

  {
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
    userId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
  },
  {
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
    userId: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
  },
  {
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
    userId: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
    isGroupAdmin: true,
  },
];

const messages = [
  {
    id: 'ed704bbf-7ef5-4a82-bf85-5e3e5a6cae39',
    userId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    content: 'Ich han dich gern Larissa',
  },
  {
    id: 'e4cfa410-3d8e-4f8a-9056-34348a8ef6e3',
    userId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    content: 'Ich dich auch Neo',
  },
  {
    id: '39d91563-0ce3-4263-8c87-f10dba05a584',
    userId: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
    content: 'Ey larissa tue doch ned so',
  },
  {
    id: '2fd5e4dd-28dd-4bbb-9b37-92d4d412ae37',
    userId: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
    content: 'ey bres wa laaauft',
  },
];

const recievers = [
  {
    userId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    messageId: 'ed704bbf-7ef5-4a82-bf85-5e3e5a6cae39',
  },
  {
    userId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    messageId: 'e4cfa410-3d8e-4f8a-9056-34348a8ef6e3',
  },
  {
    userId: 'cbab1e58-bea2-43bc-a803-46e7c63967df',
    messageId: '39d91563-0ce3-4263-8c87-f10dba05a584',
  },

  {
    userId: '41ff2b88-0b76-43d9-9d96-39a0c2aa1a2e',
    messageId: '2fd5e4dd-28dd-4bbb-9b37-92d4d412ae37',
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
  },
  {
    userId: '7bc3dbf1-fb28-4c69-a3b0-b415cd04d314',
    messageId: '2fd5e4dd-28dd-4bbb-9b37-92d4d412ae37',
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
  },
  {
    // dont know if important because he sent already
    userId: 'caf40c1e-c690-4000-9f4b-17db2e94b23e',
    messageId: '2fd5e4dd-28dd-4bbb-9b37-92d4d412ae37',
    groupId: '450b32ce-9eb7-4a82-985c-3be5ad50bf0b',
  },
];

await prisma.user.createMany({
  data: users,
  skipDuplicates: true,
});

console.log('PRISMA - CREATED MOCK USERS');

await prisma.userUser.createMany({
  data: userConnections,
  skipDuplicates: true,
});

console.log('PRISMA - CREATED MOCK USER CONNECTIONS');

await prisma.group.createMany({
  data: groups,
  skipDuplicates: true,
});

console.log('PRISMA - CREATED MOCK GROUPS');

await prisma.groupUser.createMany({
  data: groupUsers,
  skipDuplicates: true,
});

console.log('PRISMA - CREATED MOCK GROUP USERS');

await prisma.message.createMany({
  data: messages,
});

console.log('PRISMA - CREATED MOCK MESSAGES');

await prisma.reciever.createMany({
  data: recievers,
});

console.log('PRISMA - CREATED MOCK RECIEVERS OF THE MESSAGES');

prisma.$disconnect();
