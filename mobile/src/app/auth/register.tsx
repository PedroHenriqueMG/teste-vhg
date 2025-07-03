import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';

import { client } from '@/api';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';

const schema = z
  .object({
    email: z.string().email(),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof schema>;

export default function Register() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const showSuccess = useAlertSuccess();
  const showError = useAlertError();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await client.post('/signUp', {
        email: data.email,
        password: data.password,
      });
      showSuccess('Conta criada com sucesso!');
      router.push('/auth/login');
    } catch (error) {
      showError('Erro ao criar conta, verifique suas credenciais');
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

        <Text className="mb-2 text-center text-3xl font-extrabold">
          Crie sua conta
        </Text>

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
                  keyboardType="visible-password"
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

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input variant="underlined" size="lg" className="px-0">
                <InputField
                  placeholder="Confirmar senha"
                  placeholderTextColor="#888"
                  secureTextEntry={!showConfirmPassword}
                  value={value}
                  keyboardType="visible-password"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  className="px-0 text-base text-black"
                />
                <InputSlot onPress={() => setShowConfirmPassword((v) => !v)}>
                  <InputIcon
                    as={showConfirmPassword ? EyeOff : Eye}
                    color="#888"
                  />
                </InputSlot>
              </Input>
            )}
          />
          {errors.confirmPassword && (
            <Text className="text-sm text-red-500">
              {errors.confirmPassword.message}
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
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </ButtonText>
        </Button>

        <View className="mt-2 flex-row items-center justify-center">
          <Text className="text-base text-gray-700">Já possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="text-base font-semibold text-blue-600">
              Fazer login →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
