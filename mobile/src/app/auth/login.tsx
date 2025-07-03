import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { useAuth } from '@/lib';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';

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
  const showError = useAlertError();
  const showSuccess = useAlertSuccess();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data);
      showSuccess('Login realizado com sucesso');
      router.push('/main');
    } catch (error) {
      showError('Erro ao fazer login, verifique suas credenciais');
      console.error(error);
    }
  };

  return (
    <View className="size-full flex-1 items-center justify-center bg-white p-6">
      <View className="w-full max-w-sm space-y-6">
        <View className="mb-2 items-center">
          <View className="rounded-lg p-2">
            <Image
              source={require('@/assets/Logo.png')}
              style={{ width: 226, height: 226, resizeMode: 'contain' }}
            />
          </View>
        </View>

        <Text className="mb-2 text-center text-3xl font-extrabold">Login</Text>

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
                  className="px-0 text-base text-black"
                />
              </Input>
            )}
          />
          {errors.email && (
            <Text className="text-sm text-red-500">{errors.email.message}</Text>
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
                  className="px-0 text-base text-black"
                />
                <InputSlot onPress={() => setShowPassword((v) => !v)}>
                  <InputIcon as={showPassword ? EyeOff : Eye} color="#888" />
                </InputSlot>
              </Input>
            )}
          />
          {errors.password && (
            <Text className="text-sm text-red-500">
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

        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-base text-gray-700">Não possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/register')}>
            <Text className="text-base font-semibold text-blue-600">
              Criar conta →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
