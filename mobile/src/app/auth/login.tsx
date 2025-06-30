import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/lib';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export type LoginFormData = z.infer<typeof schema>;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);
      Alert.alert('Login realizado com sucesso');
      router.push('/main');
    } catch (error) {
      Alert.alert('Erro ao fazer login', 'Verifique suas credenciais');
      console.error(error);
    }
  };

  return (
    <View className="size-full flex-1 items-center justify-center p-6 bg-white">
      <View className="w-full max-w-sm space-y-6">
        <View className="items-center mb-2">
          <View className="rounded-lg p-2">
            <Image
              source={require('@/assets/Logo.png')}
              style={{ width: 226, height: 226, resizeMode: 'contain' }}
            />
          </View>
        </View>

        <Text className="text-3xl font-extrabold text-center mb-2">Login</Text>

        <View className="space-y-3">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input variant="underlined" size="lg" className="px-0">
                <InputField
                  placeholder="E-mail"
                  placeholderTextColor="#888"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="text-base text-black px-0"
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input variant="underlined" size="lg" className="px-0">
                <InputField
                  placeholder="Senha"
                  placeholderTextColor="#888"
                  secureTextEntry={!showPassword}
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="text-base text-black px-0"
                />
                <InputSlot onPress={() => setShowPassword((v) => !v)}>
                  <InputIcon as={showPassword ? EyeOff : Eye} color="#888" />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-red-500 text-sm">
              {errors.password.message}
            </Text>
          )}
        </View>

        <Button
          variant="solid"
          size="lg"
          className="mt-4 bg-black"
          onPress={handleSubmit(onSubmit)}
        >
          <ButtonText className="text-white">
            {isSubmitting ? 'Entrando...' : 'Login'}
          </ButtonText>
        </Button>

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
