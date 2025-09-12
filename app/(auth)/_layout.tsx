import { Slot } from 'expo-router'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


const AuthLayout = () => {
  return (
    <SafeAreaView>
      <Text>Auth</Text>
      <Slot/>
    </SafeAreaView>
  )
}

export default AuthLayout