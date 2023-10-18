import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {MyPlaidComponent} from '../../Src/Screens/OnBoardingDesign/Test/test';
// import {Test1} from '../../Src/Screens/OnBoardingDesign/Test1/test1';
// import {Test2} from '../../Src/Screens/OnBoardingDesign/Test2/test2';
import Welcome from '../../Src/Screens/OnBoardingDesign/WelcomeToWekeza/Welcome';
import IdentityDetails from '../../Src/Screens/OnBoardingDesign/IdentityDetails/IdentityDetails';
import DisclosuresScreen1 from '../../Src/Screens/OnBoardingDesign/Disclosures1/DisclosuresScreen1';
import Agreement from '../../Src/Screens/OnBoardingDesign/Agreement/Agreement';
import Document from '../../Src/Screens/OnBoardingDesign/Document/Document';
import TrustedContact from '../../Src/Screens/OnBoardingDesign/TrustedContact/TrustedContact';
import Summary from '../../Src/Screens/OnBoardingDesign/Summary/Summary';
import Success from '../../Src/Screens/OnBoardingDesign/Success/Success';
import {decode, encode} from 'base-64';
import AccountLinked from '../../Src/Screens/Funding/AccountLinked/AccountLinked';
import ACHRelationship from '../../Src/Screens/Funding/ACHRelationship/ACHRelationship';
import AddFund from '../../Src/Screens/Funding/AddFund/AddFund';
import FundAdded from '../../Src/Screens/Funding/FundAdded/FundAdded';
import Menu from '../../Src/Screens/MenuScreen/Menu/Menu';
import Profile from '../../Src/Screens/MenuScreen/Profile/Profile';
import Setting from '../../Src/Screens/MenuScreen/Setting/Setting';
import WatchList from '../../Src/Screens/WatchlistScreens/WatchList/WatchList';
import ContactSupport from '../../Src/Screens/MenuScreen/ContactSupport/ContactSupport';
import WatchListDetails from '../../Src/Screens/WatchlistScreens/WatchlistDetails/WatchListDetails';
import WatchListSearch from '../../Src/Screens/WatchlistScreens/WatchListSearch/WatchListSearch';
import PenaltyAgreement from '../../Src/Screens/OnBoardingDesign/PenaltyAgreement/PenaltyAgreement';
import DetailsStockView from '../../Src/Screens/Trading/DetailsStockView/DetailsStockView';
import ConnectBank from '../../Src/Screens/Funding/ConnectBank/ConnectBank';
import ConfirmOrder from '../../Src/Screens/Trading/ConfirmOrder/ConfirmOrder';
import Dashboard from '../Screens/Dashboard/dashboard';
import Portfolio from '../Screens/PortfolioScreens/Portfolio/Portfolio';
import Trade from '../Screens/Trading/Trade/Trade';
import Orders from '../Screens/MenuScreen/Orders/Orders';

const PortfolioStack = ({navigation}: any) => {
  
  if (!global.btoa) {
    global.btoa = encode;
  }
  if (!global.atob) {
    global.atob = decode;
  }

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Portfolio">
      {/* <Stack.Screen
        name="MyPlaidComponent"
        component={MyPlaidComponent}
        options={{headerTitle: 'Investing Questions'}}
      />
      <Stack.Screen
        name="test1"
        component={Test1}
        options={{headerTitle: 'testing'}}
      />
      <Stack.Screen
        name="test2"
        component={Test2}
        options={{headerTitle: 'test2'}}
      /> */}
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{headerTitle: 'Brokerage Account'}}
      />
      <Stack.Screen
        name="PenaltyAgreement"
        component={PenaltyAgreement}
        options={{headerTitle: 'Penalty Agreement'}}
      />
      <Stack.Screen
        name="IdentityDetails"
        component={IdentityDetails}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name="DisclosuresScreen1"
        component={DisclosuresScreen1}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name="Agreement"
        component={Agreement}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name="Document"
        component={Document}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name="TrustedContact"
        component={TrustedContact}
        options={{headerTitle: 'Create Account'}}
      />
      <Stack.Screen
        name="Summary"
        component={Summary}
        options={{headerTitle: 'Summary'}}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="menu"
        component={Menu}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Portfolio"
        component={Portfolio}
        options={{headerTitle: 'My Portfolio'}}
      />
      <Stack.Screen
        name="Trade"
        component={Trade}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AccountLinked"
        component={AccountLinked}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ACHRelationship"
        component={ACHRelationship}
        options={{headerTitle: 'ACH Relationship'}}
      />
      <Stack.Screen
        name="AddFund"
        component={AddFund}
        options={{headerTitle: 'Add Funds'}}
      />
      <Stack.Screen
        name="FundAdded"
        component={FundAdded}
        options={{headerTitle: 'Funds Added'}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerTitle: 'Profile'}}
      />
      <Stack.Screen
        name="WatchList"
        component={WatchList}
        options={{headerTitle: 'WatchList'}}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={{headerTitle: 'Setting'}}
      />
      <Stack.Screen
        name="ContactSupport"
        component={ContactSupport}
        options={{headerTitle: 'Disclosures'}}
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
        options={{headerTitle: 'WatchList Search'}}
      />
      <Stack.Screen
        name="DetailsStockView"
        component={DetailsStockView}
        options={{headerTitle: 'Stock Details'}}
      />
      <Stack.Screen
        name="ConnectBank"
        component={ConnectBank}
        options={{headerTitle: 'Connect Bank'}}
      />
      <Stack.Screen
        name="ConfirmOrder"
        component={ConfirmOrder}
        options={{headerTitle: 'Confirm Order'}}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{headerTitle: 'Orders'}}
      />
    </Stack.Navigator>
  );
};

export default PortfolioStack;
