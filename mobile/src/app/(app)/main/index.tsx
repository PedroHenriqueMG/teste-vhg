import { client } from '@/api';
import { ModalRegisterActivity } from '@/app/(app)/main/_components/ModalRegisterActivity';
import { Button, ButtonText } from '@/components/ui/button';
import { Activity } from '@/types/activity';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ModalEditActivity } from './_components/ModalEditActivity';
import { ModalDeleteActivity } from './_components/ModalDeleteActivity';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Main() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [count, setCount] = useState(0);

  const fetchActivities = async () => {
    try {
      const response = await client.get('/activity');
      return response.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { data: activities, isLoading } = useQuery<Activity[]>({
    queryKey: ['activities', count],
    queryFn: fetchActivities,
  });

  const getIntensity = (intensity: string) => {
    switch (intensity) {
      case 'LOW':
        return 'Baixa';
      case 'MEDIUM':
        return 'Média';
      case 'HIGH':
        return 'Alta';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isLoading ? (
        <Text>Carregando...</Text>
      ) : (
        <View className=" rounded-xl mt-6 mx-4 pb-4 shadow-md">
          <View className="flex-row items-center gap-3 pt-6 px-4">
            <Image
              source={require('@/assets/Logo.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
            <Text className="text-xl font-bold">Inicio</Text>
          </View>

          <Text className="mt-6 px-4 text-lg font-semibold">
            Suas atividades
          </Text>

          <View className="bg-white rounded-xl mt-3 mx-4 p-4 shadow border border-gray-100 items-center">
            <Text className="text-base font-medium mb-2">Atividades</Text>
            <View className="w-24 h-12 items-center justify-center">
              <View className="w-24 h-12 rounded-b-full border-8 border-t-0 border-gray-300 border-b-black overflow-hidden items-center justify-end"></View>
              <View className="absolute w-full h-full items-center justify-center top-0 left-0">
                <Text className="text-2xl font-bold">{activities?.length}</Text>
                <Text className="text-xs text-gray-500">registrados</Text>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-xl mt-4 mx-4 p-4 shadow border border-gray-100">
            <Text className="text-lg font-medium text-center mb-2">
              Resumo das atividades
            </Text>
            <View className="divide-y divide-gray-200">
              {activities?.map((activity) => (
                <View
                  key={activity.id}
                  className="flex-row items-center justify-between py-2"
                >
                  <View>
                    <Text className="text-base">{activity.name}</Text>
                    <Text className="text-xs text-gray-500">
                      Tempo: {activity.duration}
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text className="text-xs text-gray-500">
                      Intensidade:{' '}
                      <Text className="font-semibold">
                        {getIntensity(activity.intensity)}
                      </Text>
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedActivity(activity);
                        setModalVisible(true);
                      }}
                    >
                      <Text className="text-xl">›</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
            <Button
              className="mt-4 w-full"
              onPress={() => setDrawerVisible(true)}
            >
              <ButtonText>Nova atividade</ButtonText>
            </Button>
          </View>
        </View>
      )}
      <ModalRegisterActivity
        onCount={() => setCount(count + 1)}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
      <ModalEditActivity
        onDelete={() => {
          setModalVisible(false);
          setDeleteModalVisible(true);
        }}
        activity={selectedActivity!}
        onCount={() => setCount(count + 1)}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <ModalDeleteActivity
        activity={selectedActivity!}
        visible={deleteModalVisible}
        onCount={() => setCount(count + 1)}
        onClose={() => setDeleteModalVisible(false)}
      />
    </SafeAreaView>
  );
}
