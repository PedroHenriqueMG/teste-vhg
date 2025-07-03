import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { client } from '@/api';
import { ModalRegisterActivity } from '@/app/(app)/main/_components/modal-register-activity';
import { Button, ButtonText } from '@/components/ui/button';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { type Activity } from '@/types/activity';

import { ModalDeleteActivity } from './_components/modal-delete-activity';
import { ModalEditActivity } from './_components/modal-edit-activity';

export default function Main() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [count, setCount] = useState(0);
  const showError = useAlertError();

  const fetchActivities = async () => {
    try {
      const response = await client.get('/activity');
      return response.data;
    } catch (error) {
      showError('Erro ao carregar atividades');
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
        <View className=" mx-4 mt-6 rounded-xl pb-4 shadow-md">
          <View className="flex-row items-center gap-3 px-4 pt-6">
            <Image
              source={require('@/assets/Logo.png')}
              style={{ width: 40, height: 40, resizeMode: 'contain' }}
            />
            <Text className="text-xl font-bold">Inicio</Text>
          </View>

          <Text className="mt-6 px-4 text-lg font-semibold">
            Suas atividades
          </Text>

          <View className="mx-4 mt-3 items-center rounded-xl border border-gray-100 bg-white p-4 shadow">
            <Text className="mb-2 text-base font-medium">Atividades</Text>
            <View className="h-12 w-24 items-center justify-center">
              <Text className="text-2xl font-bold">{activities?.length}</Text>
              <Text className="text-xs text-gray-500">registrados</Text>
            </View>
          </View>

          <View className="mx-4 mt-4 rounded-xl border border-gray-100 bg-white p-4 shadow">
            <Text className="mb-2 text-center text-lg font-medium">
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
