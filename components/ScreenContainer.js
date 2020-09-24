import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'; 
import MainActivity from './Main'; 
import Setup from './Setup';
import ShowList from './ListPage';
import PopUp from './PopUp';
import ModalExample from './Modal'
import EditNames from './Edit'
import Login from './Login';
import SignUp from './SignUp';
import UserPage from './UserPage';
import UserList from './UserList';
import activeCourts from './activeCourts';
import activeCourtList from './activeCourtList';
import personalStats from './personalStats';
import addCourtPage from './addCourtPage';
import mapTest from './mapTest';


const MainNavigator = createStackNavigator({
    Login:{
        screen: Login,
        navigationOptions:  {
            header: null,
            gesturesEnabled: false,
         }
    },
    SignUp:{
        screen: SignUp
    },
    Setup: { 
        screen: Setup,
    },
    EditNames:{
        screen: EditNames,
    },
    MainActivity: {
    	screen: MainActivity,
    },
    List: {
    	screen: ShowList,
    },
    Test: {
    	screen: PopUp,
    },
    Modal: {
        screen: ModalExample,
    },
    User: {
        screen: UserPage,
        navigationOptions:  {
            header: null,
            gesturesEnabled: false,
         }
    },
    UserList: {
        screen: UserList,
    },
    activeCourts: {
        screen: activeCourts,
    },
    activeCourtList: {
        screen: activeCourtList,
    },
    personalStats: {
        screen: personalStats,
    },
    addCourtPage: {
        screen: addCourtPage,
    }
});


const App = createAppContainer(MainNavigator);
export default App;


