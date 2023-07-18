import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import { auth } from "../firebase-auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';

export default function App() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const nav = useNavigation();

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


  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      } else {
        setMessage(
          "Please grant permission to the app to access the microphone"
        );
      }
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  async function handleSignOut() {
    try {
      await signOut(auth);
      setUser(null);
      nav.navigate('Login');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  function fetchRecording() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.listContainer}>
          <Text style={styles.recordingItem}>
            Audio {index + 1} - {recordingLine.duration}
          </Text>
          <Button
            onPress={() => recordingLine.sound.replayAsync()}
            title="Play"
          />
          <Button
            onPress={() => recordingLine.sound.pauseAsync()}
            title="Pause"
          />
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
          <Button onPress={handleSignOut} title="Logout" />
          <Button
            title={recording ? "Stop Recording" : "Start Recording"}
            onPress={recording ? stopRecording : startRecording}
          />
          {fetchRecording()}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  listContainer: {
    flexGrow: 1,
  },
  recordingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
});
