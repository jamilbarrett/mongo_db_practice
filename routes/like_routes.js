const router = require('express').Router();
const { Planet, Like } = require('../models');

// Add like to a planet
router.put('/like/:planet_id', async (req, res) => {
  const planet_id = req.params.planet_id;

  const like = await Like.create({
    planet: planet_id
  });
  // Update one planet, using the update
  const planet = await Planet.findByIdAndUpdate(planet_id, {
    $push: {
      likes: like._id
    }
  }, { new: true });

  res.json(planet);
});

// Get likes for a planet
router.get('/likes/:planet_id', async (req, res) => {
    const planet = await Planet.findById(req.params.planet_id).populate('likes');
  
    res.json({
      planet,
      likes: planet.likes.length
    })
  });

//   Remove like from a planet
router.put('/likes/remove/:planet_id', async (req, res) => {
  try {
    const like_id = req.body.like_id;
    const planet = await Planet.findByIdAndUpdate(
      req.params.planet_id,
      {
        $pull: {
          likes: like_id,
        },
      },
      { new: true }
    );
    res.json(planet);
  } catch (error) {
    // Handle any errors that might occur during the execution of the route
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
});

module.exports = router;