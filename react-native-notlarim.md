## 📌 JSX Kuralı: Tek Parent (Root) Eleman

React / React Native’de her component’in `return` içinde **tek bir kök (parent) JSX elemanı** olmalıdır.

❌ Yanlış kullanım (iki tane `View` aynı seviyede):

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Merhaba</Text>
    </View>

    <View>
      <Text>Ben ikinci view</Text>
    </View>
  );
}
✅ Doğru kullanım (tek kapsayıcı, içinde istediğim kadar eleman):

```jsx
export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Merhaba</Text>
      </View>

      <View>
        <Text>Ben ikinci view</Text>
      </View>
    </View>
  );
}
Kodu kopyala
