import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

import { client } from '@/api';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';
import { type Activity } from '@/types/activity';

export function ModalDeleteActivity({
  visible,
  onClose,
  onCount,
  activity,
}: {
  visible: boolean;
  onClose: () => void;
  onCount: () => void;
  activity: Activity;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const showSuccess = useAlertSuccess();
  const showError = useAlertError();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await client.delete(`/activity/${activity.id}`);
      showSuccess('Atividade excluída com sucesso');
      onCount();
      onClose();
    } catch (error) {
      showError('Erro ao excluir atividade');
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center bg-black/40">
        <View className="w-11/12 max-w-md rounded-2xl bg-white p-6">
          <View className="mb-3 flex-row items-center justify-between">
            <Text className="text-2xl font-bold">Excluir atividade</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Text className="text-xl">✖️</Text>
            </TouchableOpacity>
          </View>
          <Text className="mb-6 text-base text-gray-500">
            Deseja apagar a{' '}
            <Text className="font-semibold">{activity?.name}</Text>?{'\n'}
            Confirme no botão abaixo para concluir a exclusão da atividade!
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="mr-2 flex-1 items-center rounded-lg bg-gray-100 py-3"
              onPress={onClose}
            >
              <Text className="text-base font-medium text-gray-500">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 flex-row items-center justify-center rounded-lg bg-red-700 py-3"
              onPress={handleDelete}
            >
              {isDeleting ? (
                <Text className="mr-2 text-base font-medium text-white">
                  Excluindo...
                </Text>
              ) : (
                <Text className="flex-row items-center justify-center text-base font-medium text-white">
                  Excluir atividade
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
