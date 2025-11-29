import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    // Uygulama açılınca otomatik izin iste
    (async () => {
      if (!permission) {
        await requestPermission();
      }
    })();
  }, []);

  if (!permission) {
    // Daha permission objesi gelmemişken
    return (
      <View style={styles.center}>
        <Text>İzin durumu yükleniyor...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    // Kullanıcı henüz izin vermemiş
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Kamera izni verilmedi.</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>İzin Ver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData({ type, data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GelNak Demo - Barkod Okuyucu</Text>

      <View style={styles.scannerContainer}>
        {!scanned ? (
          <CameraView
            style={StyleSheet.absoluteFillObject}
            facing="back"
            barcodeScannerSettings={{
              barcodeTypes: ['qr', 'ean13', 'ean8', 'code128', 'code39'],
            }}
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          />
        ) : (
          <View style={styles.scannedBox}>
            <Text style={styles.label}>Taranan Veri</Text>
            <Text style={styles.value}>{scannedData?.data}</Text>
            <Text style={styles.type}>Tip: {scannedData?.type}</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setScanned(false);
                setScannedData(null);
              }}
            >
              <Text style={styles.buttonText}>Tekrar Taraa</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <Text style={styles.hint}>
        Barkodu kamera alanına getir, okunduğunda veri burada görünecek.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E5E7EB',
    textAlign: 'center',
    marginBottom: 16,
  },
  scannerContainer: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#4B5563',
    marginBottom: 16,
  },
  scannedBox: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 8,
  },
  value: {
    color: '#F9FAFB',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  type: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 999,
    marginTop: 8,
  },
  buttonText: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hint: {
    color: '#9CA3AF',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 8,
  },
});
