module.exports = {
    port: process.env.PORT || 3000,
    db:  process.env.MYSQL|| 'mysql://root:@localhost:3306/delilah',
    secreto: 'helmer900608'
}