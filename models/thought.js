const { Schema, model, Types } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,            
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false,
    }
)

const reactionSchema = new Schema (
    {
        reactionId: {
            type: Schema.Types.Objectid,
            default: () => new Types.Objectid()
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true
        },
        
        createdAt: {
            type: Date,
            default: Date.now,
        }        
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema)

module.exports = Thought;