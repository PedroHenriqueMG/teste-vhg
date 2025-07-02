import { client } from '@/api';
import { getToken } from '@/lib/auth/utils';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';
import { Activity } from '@/types/activity';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { z } from 'zod';

const intensidades = ['Baixa', 'Média', 'Alta'] as const;
const duracoes = ['30 min', '45 min', '60 min', '90 min'] as const;

const intensidadeMapping = {
  Baixa: 'LOW',
  Média: 'MEDIUM',
  Alta: 'HIGH',
} as const;

const schema = z.object({
  name: z.string().min(1),
  intensity: z.enum(['Baixa', 'Média', 'Alta']),
  duration: z.enum(['30 min', '45 min', '60 min', '90 min']),
});

type FormData = z.infer<typeof schema>;

export function ModalEditActivity({
  visible,
  onClose,
  onDelete,
  onCount,
  activity,
}: {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onCount: () => void;
  activity: Activity;
}) {
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [intensidadeOpen, setIntensidadeOpen] = useState(false);
  const [duracaoOpen, setDuracaoOpen] = useState(false);
  const showSuccess = useAlertSuccess();
  const showError = useAlertError();

  const returnIntensity = (intensity: string) => {
    switch (intensity) {
      case 'LOW':
        return 'Baixa';
      case 'MEDIUM':
        return 'Média';
      case 'HIGH':
        return 'Alta';
    }
  };

  useEffect(() => {
    if (!activity) return;
    setValue('name', activity.name);
    setValue('intensity', returnIntensity(activity.intensity) as any);
    setValue('duration', activity.duration as any);
  }, [activity]);

  const intensidadeItems: {
    label: (typeof intensidades)[number];
    value: (typeof intensidades)[number];
  }[] = intensidades.map((item) => ({
    label: item,
    value: item,
  }));
  const duracaoItems: {
    label: (typeof duracoes)[number];
    value: (typeof duracoes)[number];
  }[] = duracoes.map((item) => ({ label: item, value: item }));

  const handleRegister = async (data: FormData) => {
    try {
      const intensityForAPI = intensidadeMapping[data.intensity];

      await client.patch(`/activity/${activity.id}`, {
        name: data.name,
        intensity: intensityForAPI,
        duration: data.duration,
      });

      showSuccess('Atividade editada com sucesso');
      reset();
      onCount();
      onClose();
    } catch (error) {
      showError('Erro ao editar atividade');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white rounded-t-2xl p-6 pb-8 mx-2">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-2xl font-bold">Edite sua atividade</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Text className="text-xl">✖️</Text>
            </TouchableOpacity>
          </View>

          <Text className="font-semibold mb-1">Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                placeholder="Corrida, natação, musculação..."
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text className="text-red-500 text-sm">{errors.name.message}</Text>
          )}

          <Text className="font-semibold mb-1">Intensidade</Text>
          <View className="mb-4">
            <Controller
              control={control}
              name="intensity"
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  open={intensidadeOpen}
                  value={value ?? null}
                  items={intensidadeItems}
                  setOpen={setIntensidadeOpen}
                  setValue={onChange}
                  onChangeValue={onChange}
                  multiple={false}
                  placeholder="Escolha uma intensidade"
                  style={{
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    backgroundColor: 'white',
                  }}
                  dropDownContainerStyle={{
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    backgroundColor: 'white',
                  }}
                  zIndex={2000}
                  zIndexInverse={2000}
                  listMode="SCROLLVIEW"
                />
              )}
            />
            {errors.intensity && (
              <Text className="text-red-500 text-sm">
                {errors.intensity.message}
              </Text>
            )}
          </View>

          <Text className="font-semibold mb-1 mt-2">Duração</Text>
          <View className="mb-4">
            <Controller
              control={control}
              name="duration"
              render={({ field: { onChange, value } }) => (
                <DropDownPicker
                  open={duracaoOpen}
                  value={value ?? null}
                  items={duracaoItems}
                  setOpen={setDuracaoOpen}
                  setValue={onChange}
                  onChangeValue={onChange}
                  multiple={false}
                  placeholder="Escolha uma duração"
                  style={{
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    backgroundColor: 'white',
                  }}
                  dropDownContainerStyle={{
                    borderColor: '#d1d5db',
                    borderRadius: 8,
                    backgroundColor: 'white',
                  }}
                  zIndex={3000}
                  zIndexInverse={1000}
                  listMode="SCROLLVIEW"
                />
              )}
            />
            {errors.duration && (
              <Text className="text-red-500 text-sm">
                {errors.duration.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="bg-red-700 rounded-lg w-[170px] py-3 items-center mb-2 flex-row justify-center"
            onPress={onDelete}
          >
            <Text className="text-white text-base font-bold mr-2">
              Excluir atividade
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-black rounded-lg py-3 items-center mt-4"
            onPress={handleSubmit(handleRegister)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text className="text-white text-base font-bold">
                Editando...
              </Text>
            ) : (
              <Text className="text-white text-base font-bold">
                Editar atividade
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
