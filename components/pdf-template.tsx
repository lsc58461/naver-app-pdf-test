/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";

// react pdf에서 ttf, woff 만 지원하는데 프리텐다드 안되어서 이걸로 적용
Font.register({
  family: "SpoqaHanSans",
  src: "https://cdn.jsdelivr.net/gh/spoqa/spoqa-han-sans@01ff0283e4f36e159ffbf744b36e16ef742da6d8/Subset/SpoqaHanSans/SpoqaHanSansLight.ttf",
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "SpoqaHanSans",
    padding: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 1,
  },
  label: {
    fontSize: 10,
    color: "#9496A1",
    lineHeight: 1,
  },
  content: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#404252",
    lineHeight: 1,
  },
  sectionWrapper: {
    display: "flex",
    gap: 20,
  },
  basicInfoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  image: {
    width: 200,
    height: 100,
    borderRadius: 4,
    flexShrink: 0,
  },
});

function ResumePDFTemplate() {
  const workVisaLogoUrl =
    "https://kr.object.ncloudstorage.com/workvisa/assets/logo_black_horizontal.png";

  return (
    <Document>
      <Page size="A4" orientation="portrait" style={styles.page}>
        <View style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Image style={styles.image} source={workVisaLogoUrl} />
          <Text
            style={{
              fontSize: 36,
              fontWeight: "bold",
              lineHeight: 1,
              color: "#001296",
            }}
          >
            이정윤
          </Text>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              lineHeight: 1,
              color: "#9496A1",
            }}
          >
            Lee Jeong Yun
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export { ResumePDFTemplate };
