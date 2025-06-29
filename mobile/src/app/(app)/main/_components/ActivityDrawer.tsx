import React, { useState } from 'react';
import { Text, TextInput, Modal, View, TouchableOpacity } from 'react-native';
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectContent,
  SelectItem,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
} from '@/components/ui/select';
import { ChevronDown } from 'lucide-react-native';

const intensidades = ['Baixa', 'Média', 'Alta'];
const duracoes = ['30 min', '45 min', '60 min', '90 min'];

export function ActivityDrawer({
  visible,
  onClose,
  onRegister,
}: {
  visible: boolean;
  onClose: () => void;
  onRegister: (data: {
    nome: string;
    intensidade: string;
    duracao: string;
  }) => void;
}) {
  const [nome, setNome] = useState('');
  const [intensidade, setIntensidade] = useState('');
  const [duracao, setDuracao] = useState('');

  const handleRegister = () => {
    if (nome && intensidade && duracao) {
      onRegister({ nome, intensidade, duracao });
      setNome('');
      setIntensidade('');
      setDuracao('');
      onClose();
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
            <Text className="text-2xl font-bold">Registre sua atividade</Text>
            <TouchableOpacity onPress={onClose} accessibilityLabel="Fechar">
              <Text className="text-xl">✖️</Text>
            </TouchableOpacity>
          </View>

          <Text className="font-semibold mb-1">Nome</Text>
          <TextInput
            className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
            placeholder="Corrida, natação, musculação..."
            value={nome}
            onChangeText={setNome}
          />

          <Text className="font-semibold mb-1">Intensidade</Text>
          <View className="mb-4">
            {/* <Select selectedValue={intensidade} onValueChange={setIntensidade}>
              <SelectTrigger>
                <SelectInput placeholder="Escolha uma intensidade" />
                <SelectIcon as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {intensidades.map((item) => (
                    <SelectItem key={item} label={item} value={item} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select> */}
            <Select selectedValue={intensidade} onValueChange={setIntensidade}>
              <SelectTrigger className="flex-row justify-between">
                <SelectInput placeholder="Escolha uma intensidade" />
                <SelectIcon as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  {intensidades.map((item) => (
                    <SelectItem key={item} label={item} value={item} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>

          <Text className="font-semibold mb-1 mt-2">Duração</Text>
          <View className="mb-4">
            <Select selectedValue={duracao} onValueChange={setDuracao}>
              <SelectTrigger className="flex-row justify-between">
                <SelectInput placeholder="Escolha uma duração" />
                <SelectIcon as={ChevronDown} />
              </SelectTrigger>
              <SelectPortal>
                <SelectContent>
                  {duracoes.map((item) => (
                    <SelectItem key={item} label={item} value={item} />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </View>

          <TouchableOpacity
            className="bg-black rounded-lg py-3 items-center mt-4"
            onPress={handleRegister}
            disabled={!(nome && intensidade && duracao)}
          >
            <Text className="text-white text-base font-bold">
              Registrar atividade
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
