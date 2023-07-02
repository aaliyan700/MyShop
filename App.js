import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite'
import { Button, TextInput } from 'react-native-paper';
const db = SQLite.openDatabase('Shop')
export default function App() {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const CREATE_TABLE = () => {
    let query =
      `CREATE TABLE IF NOT EXISTS User(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT 
    NOT NULL, fathername TEXT NOT NULL, age INTEGER Not Null,email TEXT NOT NULL,password TEXT NOT NULL)`;
    db.transaction((txn) => {
      txn.executeSql(
        query,
        [],
        (tx, res) => {
          console.log('User Table Created Successfully');
        },
        (error) => {
          console.log('ERROR');
        }
      );
    });
  };
  useEffect(() => {
    CREATE_TABLE();
  })
  const CreateAccount = () => {
    let query = `INSERT Into User(name,fathername,age,email,password)Values(?,?,?,?,?)`;
    db.transaction((txn) => {
      txn.executeSql(
        query,
        [name, fatherName, age, email, password],
        (tx, res) => {
          alert("User Added")
        },
        (error) => {
          console.log('ERROR');
        }
      );
    });
  }
  const SignUpUser = () => {
    if (name && fatherName && age && email && password) {
      CreateAccount();
      setName("");
      setFatherName("");
      setAge(null);
      setEmail("");
      setPassword("");
    } else {
      Alert.alert("Please input all fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ textAlign: 'center', fontSize: 20, color: 'black', fontStyle: 'normal', fontWeight: '800' }}>Sign up</Text>
      </View>
      <View>
        <TextInput
          placeholder='Enter Your Name'
          mode="outlined"
          onChangeText={(val) => setName(val)}
          value={name}
          style={styles.input}>
        </TextInput>
        <TextInput
          placeholder='Enter Your Father Name'
          mode="outlined"
          onChangeText={(val) => setFatherName(val)}
          value={fatherName}
          style={styles.input}>
        </TextInput>
        <TextInput
          placeholder='Enter Your Age'
          mode="outlined"
          onChangeText={(val) => setAge(val)}
          value={age}
          style={styles.input}>
        </TextInput>
        <TextInput
          placeholder='Enter Your Email Address'
          mode="outlined"
          onChangeText={(val) => setEmail(val)}
          value={email}
          style={styles.input}>
        </TextInput>
        <TextInput
          placeholder='Enter Your Password'
          mode="outlined"
          onChangeText={(val) => setPassword(val)}
          value={password}
          style={styles.input}>
        </TextInput>
      </View>
      <View style={{ marginTop: 10, marginHorizontal: 20 }}>
        <Button mode="contained-tonal" onPressIn={SignUpUser}>Register</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header:
  {
    backgroundColor: 'white',
    padding: 40,
    marginTop: 1,
    marginHorizontal: 1,
    borderRadius: 10
  },
  input:
  {
    marginHorizontal: 20
  }
});
