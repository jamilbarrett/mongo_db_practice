const router = require('express').Router()
const {Planet} = require('../models')

// Get all planets
router.get('/planets', async (req, res) => {
   try {
    const planets = await Planet.find({})

    res.json(planets)
   } catch (error) {
    res.status(500).json({error: 'Unable to fetch planets'})
   }
});

router.post('/planet', async (req, res) => {
    try {
      // Use the planet model to create a planet with the req.body properties - name, picture, description
      const planet = await Planet.create(req.body);
  
      // Send the new planet object back as the response
      res.json(planet);
    } catch (error) {
      // In case of an error, handle it gracefully and respond with an error
      res.status(500).json({ error: 'Unable to create a new planet' });
    }
  });


// Crere a get route tht takes a planet name as a url parameter - :some name
  router.get('/planet/:name', async (req, res) => {
        const planet = await Planet.findOne({ 
            name: {
                $regex: req.params.name,
                $options: 'i'
            }
        })
       
        if (planet) return res.json(planet)

        res.json({
            message: 'Planet not found'
        })
 });

//  Planet stats route
router.get('/stats', async (req, res) => {
  const stats = await Planet.aggregate([
    {
      $group: {
        _id: null,
        count: {$sum: 1},
        totalLikes: {
          $sum: {
            $size: '$likes'
          }

        }
      }
    }
  ])
  res.send
})


 






// Export the router object
module.exports = router;
