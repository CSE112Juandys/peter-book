import Wall from "views/WallView";
import { generateUser } from 'api/mockAPI';
import {
  Dashboard,
  Person,
  Photo,
} from "@material-ui/icons";

const user = generateUser();
const { firstName, lastName, friends } = user;

const userRoutes = [{   owner       : user,
                        util        : true,
                        path        : '/profile',
                        sidebarName : 'User Profile',
                        navbarName  : 'User Profile',
                        icon        : `${firstName[0]}${lastName[0]}`,
                        component   : Wall    }];

const friendRoutes = friends.map((friend, key) => {
    return {
        owner       : friend,
        util        : false,
        path        : `/${friend.firstName}${friend.lastName}`,
        sidebarName : `${friend.firstName} ${friend.lastName}`,
        navbarName  : `${friend.firstName} ${friend.lastName}`,
        icon        : `${friend.firstName[0]}${friend.lastName[0]}`,
        component   : Wall
    };
});

friendRoutes.push({ redirect: true, 
                    path: "/", 
                    to: "/profile",
                    navbarName: "Redirect" });

export { userRoutes, friendRoutes, user };

