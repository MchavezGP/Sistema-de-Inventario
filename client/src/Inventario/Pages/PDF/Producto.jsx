import { Document, Page, View, Text } from '@react-pdf/renderer';
const ProductoPDF = () => {
  return (
    <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
  )
};
export default ProductoPDF;
