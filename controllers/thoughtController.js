const { User, Thought } = require('../models');

module.exports = {


  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then(thoughtData => {
        return User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { thoughts: thoughtData._id } }, { new: true })
          .then(userData => {
            if (!userData) { return res.status(404).json({ message: 'thought created but user id not found' }) }
            res.json({ message: 'thought created and added to user' })
          })
      })
      .catch(err => res.json({ message: 'thought creation failed' }))
  },

  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json({ message: 'thought query failed' }))
  },

  // Get an individual thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json({ message: 'thought query failed' }))
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then(thoughtData => res.json(thoughtData))
      .catch(err => res.json({ message: 'thought query failed' }))
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json({ message: 'Thought successfully deleted' })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Add a reaction
  addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res
            .status(404)
            .json({ message: 'No thought found with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: {reactionId: req.params.reactionId} } },
      { new: true }
    )
      .then((thoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'No thought found with this id!' })
          : res.json(thoughtData)
      )
      .catch((err) => res.status(500).json(err));
  },

};