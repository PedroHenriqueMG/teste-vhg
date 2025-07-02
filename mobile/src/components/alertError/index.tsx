import { X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

interface AlertErrorModalProps {
  visible: boolean;
  message: string;
  onClose: () => void;
}

export const AlertErrorModal: React.FC<AlertErrorModalProps> = ({
  visible,
  message,
  onClose,
}) => {
  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [visible, onClose]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/25 justify-center items-center">
        <View className="w-80 min-h-[120px] bg-red-50 rounded-2xl px-6 py-8 items-center justify-center relative">
          <View className="w-10 h-10 border-2 border-red-500 rounded-xl items-center justify-center mb-3">
            <X className="w-6 h-6 text-red-500" color="red" />
          </View>
          <Text className="text-red-600 text-center font-bold text-base">
            {message}
          </Text>
          <TouchableOpacity
            onPress={onClose}
            className="absolute top-3 right-3 p-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text className="text-red-500 text-xl font-bold">×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
