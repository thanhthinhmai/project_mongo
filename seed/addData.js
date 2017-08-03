const Product = require('../models/product');
const mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping-data');
mongoose.Promise = require('bluebird');


// let product = [
//          new Product({
//         imagePath: '/images/star_wars_episode_6_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 10
//     }),

//     new Product({
//         imagePath: '/images/star_wars_episode_5_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 12
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_4_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 15
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_3_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 15
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_2_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 20
//     }),
//     new Product({
//         imagePath: '/images/star_wars_episode_1_poster.png',
//         title: 'Gothic Video Game',
//         description: 'Awesome Game',
//         price: 25
//     })
// ]

// let done = 0;
// for(let i = 0; i< product.length; i++){
//     product[i].save(function(err, result){
//         done ++;
//         if(done === product.length){
//             console.log('Save data success');
//             exit();
//         }
//     })
// }
// Product.findByIdAndUpdate('597a9dbc7a622917d7f55627')
// Product.find()
// .then(data =>{
//     console.log(data);
// })
// Product.findOneAndUpdate({price: 10}, {$set:{name:"Naomi"}},function(err, doc){
//     if(err){
//         console.log("Something wrong when updating data!");
//     }

//     console.log(doc);
// });
function exit() {
    mongoose.disconnect();
}