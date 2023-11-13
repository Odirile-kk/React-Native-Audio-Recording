import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import axios from 'axios';

const RecordScreen = () => {
    const [recording, setRecording] = useState(null);
    const [recordings, setRecordings] = useState([]);
  
    useEffect(() => {
      fetchRecordings();
    }, []);
  
    const startRecording = async () => {
      try {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
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
        const response = await axios.post('http://localhost:3000/recordings', { uri });
        const savedRecording = response.data;
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
        await axios.delete(`http://localhost:3000/recordings/${id}`);
        setRecordings(recordings.filter((recording) => recording.id !== id));
      } catch (error) {
        console.error('Failed to delete recording', error);
      }
    };
  
    const fetchRecordings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/recordings');
        const data = response.data;
        setRecordings(data);
      } catch (error) {
        console.error('Failed to fetch recordings', error);
      }
    };
  
    const renderItem = ({ item }) => (
      <View style={styles.recordingItem}>
      <Text>{`Audio-Recording${item.id}                            `}</Text>
        <TouchableOpacity onPress={() => playRecording(item.uri)}>
        <button>Play</button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => pauseRecording(item.id)}>
          <button>Pause</button>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteRecording(item.id)}>
          <button>Delete</button>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.button} onPress={recording ? stopRecording : startRecording}>
          <Text style={styles.buttonText}>{recording ? 'Stop Recording' : 'Start Recording'}</Text>
        </TouchableOpacity>
        <FlatList
          data={recordings}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
}

export default RecordScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: 'black',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      marginTop: '30%'
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