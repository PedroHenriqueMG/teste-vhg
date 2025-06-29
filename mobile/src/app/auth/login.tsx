import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react-native';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className="size-full flex-1 items-center justify-center p-6 bg-white">
      <View className="w-full max-w-sm space-y-6">
        {/* Logo */}
        <View className="items-center mb-2">
          <View className="rounded-lg p-2">
            <Image
              source={require('@/assets/Logo.png')}
              style={{ width: 226, height: 226, resizeMode: 'contain' }}
            />
          </View>
        </View>

        {/* Título */}
        <Text className="text-3xl font-extrabold text-center mb-2">Login</Text>

        {/* Inputs */}
        <View className="space-y-3">
          {/* E-mail */}
          <Input variant="underlined" size="lg" className="px-0">
            <InputField
              placeholder="E-mail"
              placeholderTextColor="#888"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              className="text-base text-black px-0"
            />
          </Input>

          {/* Senha */}
          <Input variant="underlined" size="lg" className="px-0">
            <InputField
              placeholder="Senha"
              placeholderTextColor="#888"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              className="text-base text-black px-0"
            />
            <InputSlot onPress={() => setShowPassword((v) => !v)}>
              <InputIcon as={showPassword ? EyeOff : Eye} color="#888" />
            </InputSlot>
          </Input>
        </View>

        {/* Botão */}
        <Button
          variant="solid"
          size="lg"
          className="mt-4 bg-black"
          onPress={() => router.push('/main')}
        >
          <ButtonText className="text-white">Login</ButtonText>
        </Button>

        {/* Link para login */}
        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-base text-gray-700">Não possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-base text-blue-600 font-semibold">
              Criar conta →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
