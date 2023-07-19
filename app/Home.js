import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Audio } from 'expo-av';
import { auth } from '../firebase-auth';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [recording, setRecording] = useState(null);
  const [recordings, setRecordings] = useState([]);
  const [user, setUser] = useState(null);
  const nav = useNavigation();

  useEffect(() => {
    fetchRecordings();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();

      setRecording(newRecording);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      const savedRecording = { id: Date.now(), uri };
      setRecordings([...recordings, savedRecording]);

      setRecording(null);
    } catch (error) {
      console.error('Failed to stop recording', error);
    }
  };

  const pauseRecording = async () => {
    try {
      if (recording) {
        await recording.pauseAsync();
      }
    } catch (error) {
      console.error('Failed to pause recording', error);
    }
  };

  const deleteRecording = async (id) => {
    try {
      setRecordings(recordings.filter((recording) => recording.id !== id));
    } catch (error) {
      console.error('Failed to delete recording', error);
    }
  };

  const fetchRecordings = async () => {
    try {
      const recordingsData = await AsyncStorage.getItem('recordings');
      if (recordingsData) {
        const data = JSON.parse(recordingsData);
        setRecordings(data);
      }
    } catch (error) {
      console.error('Failed to fetch recordings', error);
    }
  };

  const saveRecordings = async () => {
    try {
      await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
    } catch (error) {
      console.error('Failed to save recordings', error);
    }
  };

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUser(null);
      nav.navigate('Login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  useEffect(() => {
    saveRecordings();
  }, [recordings]);

  const renderItem = ({ item }) => (
    <View style={styles.recordingItem}>
      <Text>{`Audio-Recording${item.id}                            `}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <IconButton icon="play" onPress={() => playRecording(item.uri)} />
        <IconButton icon="pause" onPress={pauseRecording} />
        <IconButton icon="delete" onPress={() => deleteRecording(item.id)} />
      </View>
    </View>
  );

  const playRecording = async (uri) => {
    try {
      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri });
      await soundObject.playAsync();
    } catch (error) {
      console.error('Failed to play recording', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={recording ? stopRecording : startRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={recordings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <View>
        <IconButton icon="location-exit" onPress={handleSignOut} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  recordingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});
