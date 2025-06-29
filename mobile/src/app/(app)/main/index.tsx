import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Button, ButtonText } from '@/components/ui/button';
import { ActivityDrawer } from '@/app/(app)/main/_components/ActivityDrawer';

export default function Main() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleRegisterActivity = (data: {
    nome: string;
    intensidade: string;
    duracao: string;
  }) => {
    // Aqui você pode adicionar lógica para salvar a atividade
    // Exemplo: chamar API, atualizar estado, etc.
    console.log('Atividade registrada:', data);
  };

  return (
    <View className="flex-1 bg-white">
      <View className=" rounded-xl mt-6 mx-4 pb-4 shadow-md">
        <View className="flex-row items-center gap-3 pt-6 px-4">
          <Image
            source={require('@/assets/Logo.png')}
            style={{ width: 40, height: 40, resizeMode: 'contain' }}
          />
          <Text className="text-xl font-bold">Inicio</Text>
        </View>

        <Text className="mt-6 px-4 text-lg font-semibold">Suas atividades</Text>

        <View className="bg-white rounded-xl mt-3 mx-4 p-4 shadow border border-gray-100 items-center">
          <Text className="text-base font-medium mb-2">Atividades</Text>
          <View className="w-24 h-12 items-center justify-center">
            <View className="w-24 h-12 rounded-b-full border-8 border-t-0 border-gray-300 border-b-black overflow-hidden items-center justify-end"></View>
            <View className="absolute w-full h-full items-center justify-center top-0 left-0">
              <Text className="text-2xl font-bold">23</Text>
              <Text className="text-xs text-gray-500">registrados</Text>
            </View>
          </View>
        </View>

        <View className="bg-white rounded-xl mt-4 mx-4 p-4 shadow border border-gray-100">
          <Text className="text-lg font-medium text-center mb-2">
            Resumo das atividades
          </Text>
          <View className="divide-y divide-gray-200">
            <TouchableOpacity className="flex-row items-center justify-between py-2">
              <View>
                <Text className="text-base">🏃‍♂️ Corrida</Text>
                <Text className="text-xs text-gray-500">Tempo: 45Min</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-500">
                  Intensidade: <Text className="font-semibold">Média</Text>
                </Text>
                <Text className="text-xl">›</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-2">
              <View>
                <Text className="text-base">🏊‍♂️ Natação</Text>
                <Text className="text-xs text-gray-500">Tempo: 30Min</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-500">
                  Intensidade: <Text className="font-semibold">Baixa</Text>
                </Text>
                <Text className="text-xl">›</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-2">
              <View>
                <Text className="text-base">🏋️‍♂️ Musculação</Text>
                <Text className="text-xs text-gray-500">Tempo: 90Min</Text>
              </View>
              <View className="items-end">
                <Text className="text-xs text-gray-500">
                  Intensidade: <Text className="font-semibold">Alta</Text>
                </Text>
                <Text className="text-xl">›</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Button
            className="mt-4 w-full"
            onPress={() => setDrawerVisible(true)}
          >
            <ButtonText>Nova atividade</ButtonText>
          </Button>
        </View>
      </View>
      <ActivityDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onRegister={handleRegisterActivity}
      />
    </View>
  );
}
