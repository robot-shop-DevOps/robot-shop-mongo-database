db = db.getSiblingDB('users');
db.users.insertMany([
    {name: 'dummy', password: 'dummy', email: 'dummy@me.com'},
]);

// unique index on the name
db.users.createIndex(
    {name: 1},
    {unique: true}
);