var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true
});

// const User = mongoose.model('User', {
    

// })
// const Product = mongoose.model('Product', {
    
// })

// const hamada = new User({
//     userName: 'gdhgh',
//     firstName: 'abc',
//     password: "fdfd",
//     age: 10
// })
// const product = new Product({
//     name: 'dgdf'
// })


// hamada.save()
// .then(()=>{
//     console.log('meow')
// })
// .catch(err =>{
//     console.error(err);
// })
// product.save()
//     .then(() => {
//         console.log('meow')
//     })