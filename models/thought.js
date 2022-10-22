// const { Schema, model } = require('mongoose');
// const reactionSchema = require('./reaction');

// const thoughtSchema = new Schema(
//   {
//     thoughtText: {
//       type: String,
//       required: true,
//       minlength: 1,
//       maxlength: 280,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now(),
//     },
//     username: [
//       {
//         type: Schema.Types.username,
//         ref: 'user',
//       },
//     ],
//     reactions: [reactionSchema],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
// );

// thoughtSchema
//   .virtual('reactionCount')
//   .get(function () {
//     return this.reactions.length;
//   });
// thoughtSchema
//   .virtual('createdAt')
//   .get(function () {
//     let formatDate = this.createdAt;
//     return formatDate.toLocaleString();
//   });

// const Thought = model('thought', thoughtSchema);

// module.exports = Thought;