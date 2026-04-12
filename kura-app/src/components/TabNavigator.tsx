// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import InvestmentScreen from '../features/investment/screens/InvestmentScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#1A1A24',
          borderTopColor: '#1A1A24',
          borderTopWidth: 1,
          paddingBottom: 30, // 增加底部留白距離
          paddingTop: 15,
          height: 80, // 增加整體高度
        },
        tabBarActiveTintColor: '#8B5CF6',
        tabBarInactiveTintColor: '#4B5563',
      }}
    >
      <Tab.Screen 
        name="Banking" 
        component={DashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="card" size={20} color={color} />,
        }}
      />
      <Tab.Screen 
        name="Invest" 
        component={InvestmentScreen} 
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="trending-up" size={20} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
