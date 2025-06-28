import { Text, View } from 'react-native';

import { Button, ButtonText } from '@/components/ui/button';

export default function Main() {
  return (
    <View className="size-full flex-1 items-center justify-center">
      <Text className="text-error-500">Main Screen</Text>

      <Button variant="outline" size="lg" action="positive">
        <ButtonText variant="link">Clema</ButtonText>
      </Button>
    </View>
  );
}
