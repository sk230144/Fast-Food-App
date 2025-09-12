import { router } from 'expo-router'
import { View, Text, Button } from 'react-native'

const SignUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Button title='Sign Up' onPress={() => router.push('/sign-in')}/>
    </View>
  )
}

export default SignUp