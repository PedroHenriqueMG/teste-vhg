import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { client } from '@/api';
import { ArrowLeft, Pencil } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAlertError } from '@/lib/hooks/use-alert-error';

interface Message {
  id: string;
  text: string;
  from: 'user' | 'ia';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [chatName, setChatName] = useState('Nome do chat');
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const showError = useAlertError();

  const handleSend = async () => {
    try {
      if (!input.trim()) return;

      const userMessage = input;
      setInput('');

      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), text: userMessage, from: 'user' },
      ]);

      const response = await client.post('/chat/message', {
        input: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        { id: String(Date.now() + 1), text: response.data, from: 'ia' },
      ]);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (error) {
      showError('Erro ao enviar mensagem');
      console.error(error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        className="flex-row items-center justify-between px-4 pt-6 pb-4 border-b border-gray-200"
        style={{ paddingTop: insets.top + 12 }}
      >
        <TouchableOpacity onPress={() => router.push('/main')}>
          <ArrowLeft size={24} color="#222" />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            className="text-lg font-bold flex-1 text-center -ml-6 bg-transparent"
            value={chatName}
            onChangeText={setChatName}
            onBlur={() => setIsEditing(false)}
            autoFocus
            maxLength={40}
            placeholder="Nome do chat"
            placeholderTextColor="#888"
          />
        ) : (
          <Text className="text-lg font-bold flex-1 text-center -ml-6">
            {chatName}
          </Text>
        )}
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <Pencil size={22} color="#222" />
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ flexGrow: 1, padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View
            key={item.text}
            className={`mb-3 flex-row ${item.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <View
              className={`rounded-xl px-4 py-3 bg-white shadow-sm max-w-[80%] ${item.from === 'user' ? '' : ''}`}
              style={{
                alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                borderRadius: 16,
                shadowColor: '#000',
                shadowOpacity: 0.06,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 2 },
                elevation: 2,
              }}
            >
              <Text className="text-black text-base">{item.text}</Text>
            </View>
          </View>
        )}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.bottom + 24}
        style={{ position: 'absolute', left: 0, right: 0, bottom: 40 }}
      >
        <View
          className="flex-row items-center bg-[#F3F3F3] px-3 py-2 m-3 rounded-xl"
          style={{ marginBottom: insets.bottom + 4 }}
        >
          <TextInput
            className="flex-1 text-base px-2"
            placeholder="O que tem na sua mente?"
            value={input}
            onChangeText={setInput}
            placeholderTextColor="#888"
            multiline
          />
          <TouchableOpacity onPress={handleSend} disabled={!input.trim()}>
            <Ionicons
              name="send"
              size={22}
              color={input.trim() ? '#222' : '#bbb'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
