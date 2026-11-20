import mongoose , {Schema} from "mongoose";

import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
 {
    videoFile:{
        type: String, // cloudanary url
        required:true
    },
    thumbnail:{
        type: String, // cloudanary url
        required:true,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String, 
        required: true,
    },
    duration:{
        type: Number, // x// cloudanary url
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },
    isPublished:{
        type: Boolean,
        default: true,
    },
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    }

 },
 {timestamps: true,

 } 
)

videoSchema.plugin(mongooseAggregatePaginate); 
// mongoose-aggregate-paginate-v2 is a Mongoose plugin that allows you to implement pagination on MongoDB aggregation queries.

// Why do we use it?

// When your database contains thousands of records, fetching everything at once is inefficient. Pagination divides results into smaller pages.
export const Video = mongoose.model("Video",videoSchema );