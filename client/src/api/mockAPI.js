import arvind from 'assets/img/friendGridImg/arvind.jpg';
import crystal from 'assets/img/friendGridImg/crystal.jpg';
import jed from 'assets/img/friendGridImg/jed.jpg';
import jeremy from 'assets/img/friendGridImg/jeremy.jpg';
import jon from 'assets/img/friendGridImg/jon.jpg';
import katie from 'assets/img/friendGridImg/katie.jpg';
import luis from 'assets/img/friendGridImg/luis.jpg';
import patrick from 'assets/img/friendGridImg/patrick.jpg';
import sherman from 'assets/img/friendGridImg/sherman.jpg';
import tiffany from 'assets/img/friendGridImg/tiffany.jpg';
import vanessa from 'assets/img/friendGridImg/vanessa.jpg';
import photoGridImg from 'assets/img/photoGridImg/photoGridImg';

import bike from 'assets/img/photoGridImg/bike.jpg';
import breakfast from 'assets/img/photoGridImg/breakfast.jpg';
import burgers from 'assets/img/photoGridImg/burgers.jpg';
import camera from 'assets/img/photoGridImg/camera.jpg';
import hats from 'assets/img/photoGridImg/hats.jpg';
import honey from 'assets/img/photoGridImg/honey.jpg';
import morning from 'assets/img/photoGridImg/morning.jpg';
import mushroom from 'assets/img/photoGridImg/mushroom.jpg';
import olive from 'assets/img/photoGridImg/olive.jpg';
import plant from 'assets/img/photoGridImg/plant.jpg';
import star from 'assets/img/photoGridImg/star.jpg';
import vegetables from 'assets/img/photoGridImg/vegetables.jpg';

const firstNames = ["Luis", "Tiffany", "Patrick", "Crystal", "Jed", "Sherman", "Vanessa", "Katie", "Jeremy", "Arvind", "Jonathan"];
const lastNames  = ["Llobrera", "Huang", "Hu", "Yung", "Tadios", "Lee", "Chou", "Lau", "Siocon", "Kalithil", "Perapalanunt"];
const profileImgs = [luis, tiffany, patrick, crystal, jed, sherman, vanessa, katie, jeremy, arvind, jon];
const mediaImgs = [bike, breakfast, burgers, camera, hats, honey, morning, mushroom, olive, plant, star, vegetables];


  
function generateUser() {
    const pick = Math.floor(Math.random() * firstNames.length);
  
    const user =  { id : pick,
                    firstName : firstNames[pick],
                    lastName  : lastNames[pick],
                    friends   : [],
                    photos    : mediaImgs,
                    email     : `${lastNames[pick]}@gmail.com`,
                    phone     : "1111111111",
                    //profileImg : profileImgs[pick],
                    profileImg : null,
                    profileInfo : "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
                  };

    user.friends = generateFriends(user);
  
    return user;
}

function generateUsers() {
    const users = [];

    for (var i = 0; i < firstNames.length; i++) {
      const user =  { id : i,
                      firstName : firstNames[i],
                      lastName  : lastNames[i],
                      friends   : [],
                      photos    : mediaImgs,
                      email     : `${lastNames[i]}@gmail.com`,
                      phone     : "1111111111",
                      newsFeed  : [],
                      //profileImg : profileImgs[i],
                      profileImg : null,
                      profileInfo : "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
                    };
  
      users.push(user);
    }
    return users;
}

function generateFriends(forUser) {

    const forFirstName = forUser.firstName;
    const forLastName  = forUser.lastName;

    return generateUsers().filter((user) => {
        const { firstName, lastName } = user;
        return (forFirstName !== firstName && forLastName !== lastName);
    })
}

function generatePosts(forUser, numPosts) {
    const posts = [];
    const { friends } = forUser;
    
    for (var i = 0; i < numPosts; i++) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                // generate a post by user for a friend of user
                posts.push(generatePost(friends[Math.floor(Math.random() * friends.length)], forUser));
                break;
            case 1:
                // generate a post by a friend of user for user
                posts.push(generatePost(forUser, friends[Math.floor(Math.random() * friends.length)]));
                break;
            case 2:
                // generate a post by user for a friend of user w image
                posts.push(generatePost(friends[Math.floor(Math.random() * friends.length)], forUser, true));
                break;
            case 3:
                // generate a post by a friend of user for user w image
                posts.push(generatePost(forUser, friends[Math.floor(Math.random() * friends.length)], true));
                break;
            default:
                break;
        }
    }
    return posts;
}

function generatePost(forUser, byUser, withMedia=false) {
    const date = new Date()
    const postDate = `${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCFullYear()}`
  
    const post    = { id : 0,
                      author    : byUser,
                      recipient : forUser,
                      content   : generate(),
                      media     : null,
                      edited    : true,
                      created   : postDate,
                      updated   : postDate,
                      comments  : [],
                      likes     : 0,
                    }

    if (withMedia) {
        post.media = mediaImgs[Math.floor(Math.random() * mediaImgs.length)];
    }
    return post;
}

function generateAd() {
    return { ad : true };
}

/*****************************************************************************/
//RAND SENTENCE GENERATOR FOR POSTS
/*****************************************************************************/
var verbs =
[   
    ["go to", "goes to", "going to", "went to", "gone to"],
    ["look at", "looks at", "looking at", "looked at", "looked at"],
    ["choose", "chooses", "choosing", "chose", "chosen"]
];
var tenses = 
[
    {name:"Present", singular:1, plural:0, format:"%subject %verb %complement"},
    {name:"Past", singular:3, plural:3, format:"%subject %verb %complement"},
    {name:"Present Continues", singular:2, plural:2, format:"%subject %be %verb %complement"}
];
var subjects =
[
    {name:"I", be:"am", singular:0},
    {name:"You", be:"are", singular:0},
    {name:"He", be:"is", singular:1}
];
var complementsForVerbs =
[
    ["cinema", "Egypt", "home", "concert"],
    ["for a map", "them", "the stars", "the lake"],
    ["a book for reading", "a dvd for tonight"]
]
Array.prototype.random = function(){return this[Math.floor(Math.random() * this.length)];};
    
function generate() {
    var result = generateSentence() + generateSentence() + generateSentence();
    var pick = Math.floor(Math.random() * 5);

    for (var i = 0; i < pick; i++) {
        result += generateSentence();
    }

    return result;
}

function generateSentence(){
    var index = Math.floor(verbs.length * Math.random());
    var tense = tenses.random();
    var subject = subjects.random();
    var verb = verbs[index];
    var complement = complementsForVerbs[index];
    var str = tense.format;
    str = str.replace("%subject", subject.name).replace("%be", subject.be);
    str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
    str = str.replace("%complement", complement.random());
    return str + ". ";
}
/*****************************************************************************/

export {
    generateUser, 
    generateUsers,
    generateFriends,
    generatePost,
    generatePosts,
    generateAd };