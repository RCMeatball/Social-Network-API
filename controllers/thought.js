const { user, thought } = require('../models');

module.exports = {
    getThought(req, res) {
        thought.find({})
        .then((thought) => res.json(thought))
        .catch((err) => res.status(500).json(err));
        
    },

    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
        .select("-__V")
        .then((thought) => 
        !thought ? res.status(404).json({ message: "No thought with this ID "})
        : res.json(thought)
        )
    },

    createThought(req, res) {
        thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: "No user with this ID" })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },

    deleteThought(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId})
        .then((thought) => 
        !thought ? res.status(404).json({ message: "No thought with this ID"})
        : user.findOneAndUpdate(
            { thoughts: req.params.thoughtId},
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
        ))
    },

    updateThought(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId},
            { $set: req.body },
            { runValidators: true, New: true}
        )
        .then((user) =>
        !user ? res.status(404).json({ message: "No thought with this ID"})
        : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    addReaction(req, res) {
        thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true}
        )
        .then((thought) =>
        !thought ? res.status(404).json({ message: "No thought with that ID"})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    deleteReaction(req, res) {
        thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought ? res.status(404).json({ message: "No thought with that ID"})
        : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    }
}