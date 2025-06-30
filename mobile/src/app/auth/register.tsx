import { useState } from 'react';
import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputSlot, InputField, InputIcon } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react-native';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { client } from '@/api';

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

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await client.post('/signUp', {
        email: data.email,
        password: data.password,
      });
      Alert.alert('Conta criada com sucesso!');
      router.push('/auth/login');
    } catch (error) {
      Alert.alert('Erro ao criar conta', 'Verifique suas credenciais');
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

        <Text className="text-3xl font-extrabold text-center mb-2">
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
                  keyboardType="visible-password"
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
                  className="text-base text-black px-0"
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
            <Text className="text-red-500 text-sm">
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

        <View className="flex-row justify-center items-center mt-2">
          <Text className="text-base text-gray-700">Já possui conta? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text className="text-base text-blue-600 font-semibold">
              Fazer login →
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
