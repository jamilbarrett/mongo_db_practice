const db = require('./connection');
const { Planet, Like } = require('../models');
// const axios = require('axios');

const planets = require('./planets');

const planetData = [];

db.once('open', async () => {
  console.log('db connected!');

  await Planet.deleteMany({});

  console.log('Planets removed.');

  for (let planet in planets) {
    const data = planets[planet];

    planetData.push({
      name: data.name,
      picture: data.picture,
      description: data.description
    });
  }

  await Planet.insertMany(planetData);

  console.log('Planets seeded successfully');

  process.exit();


  // planets.forEach(async (planet, index) => {
  //   const url = `https://planets-17f2.onrender.com/planets/getPlanet?name=${planet}`;
  //   const { data } = await axios.get(url);

  //   planetData.push({
  //     name: data.name,
  //     picture: data.picture,
  //     description: data.description
  //   });

  //   if (index === planets.length - 1) {
  //     await Planet.insertMany(planetData);

  //     console.log('Planets seeded successfully');

  //     process.exit();
  //   }
  // });
});