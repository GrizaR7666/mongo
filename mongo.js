conn = new Mongo();
db = conn.getDB("rgriza");
db = connect("localhost:27017/rgriza");
db.createCollection("customers");
db.createCollection("orders");
fNames = ['Ваня', 'Витя', 'Володя']
lNames = ['Артем', 'Антон', 'Андрей']
function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
for (let i = 0; i < 3000; i++) {

    db.customers.insert({
        name: {
            first: fNames[randomNumber(0, 3)],
            last: lNames[randomNumber(0, 3)]
        },
        balance: randomNumber(0, 100000),
        createdAt: new Date()
    })
}
db.customers.find().forEach(element => {

    nOrders = randomNumber(1, 10)
    
    for (let j = 0; j <= nOrders; j++) {
        db.orders.insert({
            customerId: element._id,
            count: randomNumber(1, 100),
            price: randomNumber(20, 100),
            discount: randomNumber(5, 30),
            title: 'Заголовок',
            product: 'Это продукт'
        })
    }
});
db.orders.count()
db.customers.totalSize()
db.orders.totalSize()
db.customers.totalSize() + db.orders.totalSize()