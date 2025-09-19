import seed from '@/lib/seed'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Search = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <Text>search</Text>
      <Button title='Seed' onPress={() => seed().catch((err) => console.log('Failed to seed database',err))} />
    </SafeAreaView>
  )
}

export default Search