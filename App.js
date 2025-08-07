import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [points, setPoints] = useState(0);
  const [userId] = useState(() => 'user-' + Math.floor(Math.random() * 1000000));
  const [screen, setScreen] = useState('home');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [adminAmount, setAdminAmount] = useState('');

  const renderHome = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Ваш QR Код</Text>
      <QRCode value={userId} size={200} />
      <Text style={styles.points}>Баллы: {points.toFixed(2)}</Text>
    </View>
  );

  const renderPurchase = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Покупка</Text>
      <TextInput
        style={styles.input}
        value={purchaseAmount}
        onChangeText={setPurchaseAmount}
        placeholder="Сумма покупки"
        keyboardType="numeric"
      />
      <Button title="Начислить баллы" onPress={() => {
        const amount = parseFloat(purchaseAmount);
        if (!isNaN(amount)) {
          setPoints(p => p + amount * 0.01);
          setPurchaseAmount('');
          setScreen('home');
        }
      }} />
    </View>
  );

  const renderAdmin = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Админка</Text>
      <TextInput
        style={styles.input}
        value={adminAmount}
        onChangeText={setAdminAmount}
        placeholder="Баллы для начисления"
        keyboardType="numeric"
      />
      <Button title="Начислить" onPress={() => {
        const amount = parseFloat(adminAmount);
        if (!isNaN(amount)) {
          setPoints(p => p + amount);
          setAdminAmount('');
          setScreen('home');
        }
      }} />
    </View>
  );

  let content;
  if (screen === 'purchase') content = renderPurchase();
  else if (screen === 'admin') content = renderAdmin();
  else content = renderHome();

  return (
    <View style={styles.container}>
      {content}
      <View style={styles.nav}>
        <Button title="Главная" onPress={() => setScreen('home')} />
        <Button title="Покупка" onPress={() => setScreen('purchase')} />
        <Button title="Админка" onPress={() => setScreen('admin')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  points: { fontSize: 20, marginTop: 20 },
  input: { width: '80%', borderWidth: 1, padding: 10, marginBottom: 20 },
  nav: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 40 }
});
