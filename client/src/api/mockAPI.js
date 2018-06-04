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


const firstNames = ["Luis", "Tiffany", "Patrick", "Crystal", "Jed", "Sherman", "Vanessa", "Katie", "Jeremy", "Arvind", "Jonathan"];
const lastNames  = ["Llobrera", "Huang", "Hu", "Yung", "Tadios", "Lee", "Chou", "Lau", "Siocon", "Kalithil", "Perapalanunt"];
const profileImgs = [luis, tiffany, patrick, crystal, jed, sherman, vanessa, katie, jeremy, arvind, jon];


  
function generateUser() {
    const pick = Math.floor(Math.random() * firstNames.length);
  
    const user =  { id : 0,
                    firstName : firstNames[pick],
                    lastName  : lastNames[pick],
                    friends   : [],
                    photos    : photoGridImg,
                    email     : `${lastNames[pick]}@gmail.com`,
                    phone     : "1111111111",
                    profileImg : profileImgs[pick],
                    profileInfo : "The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog."
                  };

    user.friends = generateFriends(user);
  
    return user;
}

function generateUsers() {
    const users = [];

    for (var i = 0; i < firstNames.length; i++) {
      const user =  { id : 0,
                      firstName : firstNames[i],
                      lastName  : lastNames[i],
                      friends   : [],
                      photos    : photoGridImg,
                      email     : `${lastNames[i]}@gmail.com`,
                      phone     : "1111111111",
                      newsFeed  : [],
                      profileImg : profileImgs[i],
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
        switch (Math.floor(Math.random() * 2)) {
            case 0:
                // generate a post by user for a friend of user
                posts.push(generatePost(friends[Math.floor(Math.random() * friends.length)], forUser));
                break;
            case 1:
                // generate a post by a friend of user for user
                posts.push(generatePost(forUser, friends[Math.floor(Math.random() * friends.length)]));
                break;
            case 2:
                // generate an ad
                posts.push(generateAd());
                break;
            default:
                break;
        }
    }
    return posts;
}

function generatePost(forUser, byUser) {
    const date = new Date()
    const postDate = `${date.getUTCMonth()}-${date.getUTCDate()}-${date.getUTCFullYear()}`
  
    const post    = { id : 0,
                      author    : byUser,
                      recipient : forUser,
                      content   : generate(),
                      edited    : true,
                      created   : postDate,
                      updated   : postDate,
                      comments  : [],
                      likes     : 0,
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
    
function generate(){
    var index = Math.floor(verbs.length * Math.random());
    var tense = tenses.random();
    var subject = subjects.random();
    var verb = verbs[index];
    var complement = complementsForVerbs[index];
    var str = tense.format;
    str = str.replace("%subject", subject.name).replace("%be", subject.be);
    str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
    str = str.replace("%complement", complement.random());
    return str;
}
/*****************************************************************************/

export {
    generateUser, 
    generateUsers,
    generateFriends,
    generatePost,
    generatePosts,
    generateAd };