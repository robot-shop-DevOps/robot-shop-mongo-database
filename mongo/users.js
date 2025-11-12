db = db.getSiblingDB('users');

const existingIndexes = db.users.getIndexes().map(i => i.name);
if (!existingIndexes.includes('name_1')) {
  db.users.createIndex({ name: 1 }, { unique: true });
  print('Created unique index on "name"');
} else {
  print('Unique index on "name" already exists, skipping.');
}

const defaultUsers = [
  { name: 'dummy', password: 'dummy', email: 'dummy@me.com' },
];

defaultUsers.forEach(user => {
  if (!db.users.findOne({ name: user.name })) {
    db.users.insertOne(user);
    print('Created user: ${user.name}');
  } else {
    print('User ${user.name} already exists, skipping.');
  }
});