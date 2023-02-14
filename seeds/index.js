const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 20; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        // const image = await getRandomImage();
        const camp = new Campground({
            //Your USER ID
            author: '63dd694a33bc2ba9352a955e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex vero non delectus est consectetur, enim dicta aliquam, magni assumenda quia eaque velit minus ratione cumque ducimus ea aliquid possimus accusamus?',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
              ]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/drwvwhatu/image/upload/v1675470974/kamp.az/forrtxcobrjjwmzrm8wa.jpg',
                filename: 'kamp.az/forrtxcobrjjwmzrm8wa',
              },
              {
                url: 'https://res.cloudinary.com/drwvwhatu/image/upload/v1675471450/kamp.az/wjoajistyzm2xfe8qf2h.jpg',
                filename: 'kamp.az/ur93lybgndiwanmu7ttd',
              }
            ]
        })
        await camp.save();
    }
}

// const getRandomImage = async () => {
//     const response = await fetch("https://api.unsplash.com/photos/random?client_id=0VqhvsOHZt6wNC2nuyPUMvmt5uu7O-9h5YGoqp3zaw4&collections=483251", {
//       headers: {
//         Accept: "application/json",
//       },
//     });
//     const data = await response.json();
//     return data.urls.regular;
//   };


seedDB().then(() => {
    mongoose.connection.close();
})


