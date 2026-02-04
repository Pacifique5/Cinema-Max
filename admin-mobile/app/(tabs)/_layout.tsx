import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAdminAuth } from "../../contexts/AdminAuthContext";

function TabIcon({ focused, name, title }: { focused: boolean; name: any; title: string }) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 8 }}>
      <Ionicons 
        name={name} 
        size={24} 
        color={focused ? '#FF6B6B' : '#666'} 
      />
      <Text 
        style={{ 
          color: focused ? '#FF6B6B' : '#666', 
          fontSize: 12, 
          marginTop: 4,
          fontWeight: focused ? '600' : '400'
        }}
      >
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const { hasPermission } = useAdminAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#333',
          borderTopWidth: 1,
          height: 80,
          paddingBottom: 10,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="stats-chart" title="Dashboard" />
          ),
        }}
      />
      
      {hasPermission('users.read') && (
        <Tabs.Screen
          name="users"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="people" title="Users" />
            ),
          }}
        />
      )}
      
      {hasPermission('movies.read') && (
        <Tabs.Screen
          name="movies"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="film" title="Movies" />
            ),
          }}
        />
      )}
      
      {hasPermission('analytics.read') && (
        <Tabs.Screen
          name="analytics"
          options={{
            tabBarIcon: ({ focused }) => (
              <TabIcon focused={focused} name="bar-chart" title="Analytics" />
            ),
          }}
        />
      )}
      
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} name="person" title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}