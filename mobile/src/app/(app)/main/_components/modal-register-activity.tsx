import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { z } from 'zod';

import { client } from '@/api';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';

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

type Activity = z.infer<typeof schema>;

export function ModalRegisterActivity({
  visible,
  onClose,
  onCount,
}: {
  visible: boolean;
  onClose: () => void;
  onCount: () => void;
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Activity>({
    resolver: zodResolver(schema),
  });

  const [intensidadeOpen, setIntensidadeOpen] = useState(false);
  const [duracaoOpen, setDuracaoOpen] = useState(false);
  const showSuccess = useAlertSuccess();
  const showError = useAlertError();

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

  const handleRegister = async (data: Activity) => {
    try {
      const intensityForAPI = intensidadeMapping[data.intensity];

      await client.post('/activity', {
        name: data.name,
        intensity: intensityForAPI,
        duration: data.duration,
      });

      showSuccess('Atividade registrada com sucesso');
      reset();
      onCount();
      onClose();
    } catch (error) {
      showError('Erro ao registrar atividade');
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
        <View className="mx-2 rounded-t-2xl bg-white p-6 pb-8">
          <View className="mb-4 flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Registre sua atividade</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Text className="text-xl">✖️</Text>
            </TouchableOpacity>
          </View>

          <Text className="mb-1 font-semibold">Nome</Text>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="mb-4 rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Corrida, natação, musculação..."
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                autoFocus
              />
            )}
          />
          {errors.name && (
            <Text className="text-sm text-red-500">{errors.name.message}</Text>
          )}

          <Text className="mb-1 font-semibold">Intensidade</Text>
          <View style={{ zIndex: intensidadeOpen ? 2000 : 1000 }}>
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
                  zIndex={intensidadeOpen ? 2000 : 1000}
                  zIndexInverse={intensidadeOpen ? 1000 : 2000}
                  listMode="SCROLLVIEW"
                />
              )}
            />
            {errors.intensity && (
              <Text className="text-sm text-red-500">
                {errors.intensity.message}
              </Text>
            )}
          </View>

          <Text className="mb-1 mt-2 font-semibold">Duração</Text>
          <View style={{ zIndex: duracaoOpen ? 2000 : 1000 }}>
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
                  zIndex={duracaoOpen ? 2000 : 1000}
                  zIndexInverse={duracaoOpen ? 1000 : 2000}
                  listMode="SCROLLVIEW"
                />
              )}
            />
            {errors.duration && (
              <Text className="text-sm text-red-500">
                {errors.duration.message}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className="mt-4 items-center rounded-lg bg-black py-3"
            onPress={handleSubmit(handleRegister)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Text className="text-base font-bold text-white">
                Registrando...
              </Text>
            ) : (
              <Text className="text-base font-bold text-white">
                Registrar atividade
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
