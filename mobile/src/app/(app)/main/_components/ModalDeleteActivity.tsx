import { client } from '@/api';
import { useAlertError } from '@/lib/hooks/use-alert-error';
import { useAlertSuccess } from '@/lib/hooks/use-alert-success';
import { Activity } from '@/types/activity';
import React, { useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';

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
      <View className="flex-1 justify-center items-center bg-black/40">
        <View className="bg-white rounded-2xl p-6 w-11/12 max-w-md">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-2xl font-bold">Excluir atividade</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Text className="text-xl">✖️</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 text-base mb-6">
            Deseja apagar a{' '}
            <Text className="font-semibold">{activity?.name}</Text>?{'\n'}
            Confirme no botão abaixo para concluir a exclusão da atividade!
          </Text>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-gray-100 rounded-lg py-3 items-center mr-2"
              onPress={onClose}
            >
              <Text className="text-base text-gray-500 font-medium">
                Cancelar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-red-700 rounded-lg py-3 items-center flex-row justify-center"
              onPress={handleDelete}
            >
              {isDeleting ? (
                <Text className="text-white text-base font-medium mr-2">
                  Excluindo...
                </Text>
              ) : (
                <Text className="text-white text-base font-medium flex-row items-center justify-center">
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
