import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigation from "./src/navigation/BottomTabsNavigation";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabsNavigation /> 
    </NavigationContainer>
  );
}