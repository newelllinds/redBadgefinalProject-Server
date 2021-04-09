const User = require('./user');
const SaleListing = require('./forsale')
const ArtistProfile = require('./artistprofile')

User.hasOne(ArtistProfile);
ArtistProfile.belongsTo(User);

User.hasMany(SaleListing);
SaleListing.belongsTo(User);

module.exports = {
    User,
    SaleListing,
    ArtistProfile,
};



//many to many
//one to one
//one to many

//Questions:
// 1. How does this work when there are 2 diff roles for the user? 
// - Answer - Use a ternary to show the artist profile only if they have an artist role
// 2. What's the diff between the top couple lines on the models? Use the format in Rob's associations example