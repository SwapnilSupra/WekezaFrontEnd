import React, { useEffect } from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabScreen from './Src/Navigation/BottomTabScreen';
import SplashScreen from './Src/Screens/OnBoardingDesign/SplashScreen/SplashScreen';
import SignupScreen from './Src/Screens/OnBoardingDesign/SignupScreen/SignupScreen';
import SigninScreen from './Src/Screens/OnBoardingDesign/SigninScreen/SigninScreen';
import ForgotScreen from './Src/Screens/OnBoardingDesign/ForgotScreen/ForgotScreen';
import CommisionFree from './Src/Screens/OnBoardingDesign/CommisionFree/CommisionFree';
import FewQue from './Src/Screens/OnBoardingDesign/FewQue/FewQue';
import QueMark from './Src/Screens/OnBoardingDesign/QueMark/QueMark';
import EmployeeInfo from './Src/Screens/OnBoardingDesign/EmployeeInfo/EmployeeInfo';
import AnnualIncome from './Src/Screens/OnBoardingDesign/AnnualIncome/AnnualIncome';
import LiquidAssets from './Src/Screens/OnBoardingDesign/LiquidAssets/LiquidAssets';
import FundAccount from './Src/Screens/OnBoardingDesign/FundAccount/FundAccount';
import ContactDetails from './Src/Screens/OnBoardingDesign/ContactDetails/ContactDetails';
// import { MyPlaidComponent } from './Src/Screens/OnBoardingDesign/Test/test';
// import { Test1 } from './Src/Screens/OnBoardingDesign/Test1/test1';
// import { Test2 } from './Src/Screens/OnBoardingDesign/Test2/test2';
import Welcome from './Src/Screens/OnBoardingDesign/WelcomeToWekeza/Welcome';
import IdentityDetails from './Src/Screens/OnBoardingDesign/IdentityDetails/IdentityDetails';
import DisclosuresScreen1 from './Src/Screens/OnBoardingDesign/Disclosures1/DisclosuresScreen1';
import Agreement from './Src/Screens/OnBoardingDesign/Agreement/Agreement';
import Document from './Src/Screens/OnBoardingDesign/Document/Document';
import TrustedContact from './Src/Screens/OnBoardingDesign/TrustedContact/TrustedContact';
import Summary from './Src/Screens/OnBoardingDesign/Summary/Summary';
import Success from './Src/Screens/OnBoardingDesign/Success/Success';
import { decode, encode } from 'base-64';
import AccountLinked from './Src/Screens/Funding/AccountLinked/AccountLinked';
import ACHRelationship from './Src/Screens/Funding/ACHRelationship/ACHRelationship';
import AddFund from './Src/Screens/Funding/AddFund/AddFund';
import FundAdded from './Src/Screens/Funding/FundAdded/FundAdded';
import Menu from './Src/Screens/MenuScreen/Menu/Menu';
import Profile from './Src/Screens/MenuScreen/Profile/Profile';
import Setting from './Src/Screens/MenuScreen/Setting/Setting';
import WatchList from './Src/Screens/WatchlistScreens/WatchList/WatchList';
import ContactSupport from './Src/Screens/MenuScreen/ContactSupport/ContactSupport';
import WatchListDetails from './Src/Screens/WatchlistScreens/WatchlistDetails/WatchListDetails';
import WatchListSearch from './Src/Screens/WatchlistScreens/WatchListSearch/WatchListSearch';
import PenaltyAgreement from './Src/Screens/OnBoardingDesign/PenaltyAgreement/PenaltyAgreement';
import DetailsStockView from './Src/Screens/Trading/DetailsStockView/DetailsStockView';
import ConnectBank from './Src/Screens/Funding/ConnectBank/ConnectBank';
import ConfirmOrder from './Src/Screens/Trading/ConfirmOrder/ConfirmOrder';
import EditDocument from './Src/Screens/MenuScreen/EditDocument/EditDocument';
import Video from './Src/Screens/Video/video';
import Downloads from './Src/Screens/MenuScreen/Downloads/Downloads';
import { requestUserPermission, notificationListener } from './Src/ReusableComponents/notification';
import { LogBox } from "react-native";
import NewsDetails from './Src/Screens/NewsDetails/NewsDetails';
import Transactions from './Src/Screens/MenuScreen/Transactions/Transactions';
import ResetPassword from './Src/Screens/OnBoardingDesign/ResetPassword/ResetPassword';

const TestFairy = require('react-native-testfairy');

LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])


const App = ({ navigation }: any) => {

  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    requestUserPermission();
    notificationListener();
    //TestFairy.begin("SDK-y8SJi6Az");
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signin"
          component={SigninScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotScreen"
          component={ForgotScreen}
          options={{ headerTitle: 'Forgot Password' }}
        />
        <Stack.Screen
          name="CommisionFree"
          component={CommisionFree}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="FewQue"
          component={FewQue}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="QueMark"
          component={QueMark}
          options={{ headerTitle: '' }}
        />
        <Stack.Screen
          name="EmployeeInfo"
          component={EmployeeInfo}
          options={{ headerTitle: 'Investing Questions' }}
        />
        <Stack.Screen
          name="AnnualIncome"
          component={AnnualIncome}
          options={{ headerTitle: 'Investing Questions' }}
        />
        <Stack.Screen
          name="LiquidAssets"
          component={LiquidAssets}
          options={{ headerTitle: 'Investing Questions' }}
        />
        <Stack.Screen
          name="FundAccount"
          component={FundAccount}
          options={{ headerTitle: 'Investing Questions' }}
        />
        <Stack.Screen
          name="ContactDetails"
          component={ContactDetails}
          options={{ headerTitle: 'Investing Questions' }}
        />
        {/* <Stack.Screen
          name="MyPlaidComponent"
          component={MyPlaidComponent}
          options={{ headerTitle: 'Investing Questions' }}
        /> */}
        {/* <Stack.Screen
          name="test1"
          component={Test1}
          options={{ headerTitle: 'testing' }}
        /> */}
        {/* <Stack.Screen
          name="test2"
          component={Test2}
          options={{ headerTitle: 'test2' }}
        /> */}
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerTitle: 'Brokerage Account' }}
        />
        <Stack.Screen
          name="PenaltyAgreement"
          component={PenaltyAgreement}
          options={{ headerTitle: 'Penalty Agreement' }}
        />
        <Stack.Screen
          name="IdentityDetails"
          component={IdentityDetails}
          options={{ headerTitle: 'Create Account' }}
        />
        <Stack.Screen
          name="DisclosuresScreen1"
          component={DisclosuresScreen1}
          options={{ headerTitle: 'Create Account' }}
        />
        <Stack.Screen
          name="Agreement"
          component={Agreement}
          options={{ headerTitle: 'Create Account' }}
        />
        <Stack.Screen
          name="Document"
          component={Document}
          options={{ headerTitle: 'Create Account' }}
        />
        <Stack.Screen
          name="TrustedContact"
          component={TrustedContact}
          options={{ headerTitle: 'Create Account' }}
        />
        <Stack.Screen
          name="Summary"
          component={Summary}
          options={{ headerTitle: 'Summary' }}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="bottomTab"
          component={BottomTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="menu"
          component={Menu}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AccountLinked"
          component={AccountLinked}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ACHRelationship"
          component={ACHRelationship}
          options={{ headerTitle: 'ACH Relationship' }}
        />
        <Stack.Screen
          name="AddFund"
          component={AddFund}
          options={{ headerTitle: 'Add Funds' }}
        />
        <Stack.Screen
          name="FundAdded"
          component={FundAdded}
          options={{ headerTitle: 'Funds Added' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerTitle: 'Profile' }}
        />
        <Stack.Screen
          name="WatchList"
          component={WatchList}
          options={{ headerTitle: 'WatchList' }}
        />
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{ headerTitle: 'Setting' }}
        />
        <Stack.Screen
          name="ContactSupport"
          component={ContactSupport}
          options={{ headerTitle: 'Disclosures' }}
        />
        <Stack.Screen
          name="WatchListDetails"
          component={WatchListDetails}
          options={{
            headerTitle: 'Watchlist Details',
          }}
        />
        <Stack.Screen
          name="WatchListSearch"
          component={WatchListSearch}
          options={{ headerTitle: 'WatchList Search' }}
        />
        <Stack.Screen
          name="DetailsStockView"
          component={DetailsStockView}
          options={{ headerTitle: 'Stock Details' }}
        />
        <Stack.Screen
          name="ConnectBank"
          component={ConnectBank}
          options={{ headerTitle: 'Connect Bank' }}
        />
        <Stack.Screen
          name="ConfirmOrder"
          component={ConfirmOrder}
          options={{ headerTitle: 'Confirm Order' }}
        />        
        <Stack.Screen
          name="EditDocument"
          component={EditDocument}
          options={{ headerTitle: 'Edit Document' }}
        />
        <Stack.Screen
          name="Video"
          component={Video}
          options={{ headerTitle: 'Video' }}
        />
        <Stack.Screen
          name="Downloads"
          component={Downloads}
          options={{ headerTitle: 'Downloads' }}
        />
        <Stack.Screen
          name="NewsDetails"
          component={NewsDetails}
          options={{
            headerTitle: 'News Details',
          }}
        />
        <Stack.Screen
          name="Transactions"
          component={Transactions}
          options={{ headerTitle: 'Transactions' }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerTitle: 'Reset Password' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
