db.auth('root', 'password')

db.createUser({
    user: "root",
    pwd: "password",
    roles: [{role: "readWrite", db: "Spendee"}]
});
