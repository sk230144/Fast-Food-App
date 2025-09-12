import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignIn = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <Button title='Sign In' onPress={() => router.push('/sign-up')}/>
    </View>
  )
}

export default SignIn