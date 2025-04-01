import { createStackNavigator } from '@react-navigation/stack';
import BusinessList from '../screens/BusinessList';
import ArticleList from '../screens/ArticleList';
import AddBusiness from '../screens/AddBusiness';
import AddArticle from '../screens/AddArticle';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BusinessList">
      <Stack.Screen
        name="BusinessList"
        component={BusinessList}
        options={{ title: 'Businesses' }}
      />
      <Stack.Screen
        name="ArticleList"
        component={ArticleList}
        options={{ title: 'Articles' }}
      />
      <Stack.Screen
        name="AddBusiness"
        component={AddBusiness}
        options={{ title: 'Add Business' }}
      />
      <Stack.Screen
        name="AddArticle"
        component={AddArticle}
        options={{ title: 'Add Article' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;