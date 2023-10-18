import { StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';
import React from 'react';

interface PdfProperty {

  uri: any;
}

const PdfView = (props: PdfProperty) => {

  return (
    <Pdf
      source={props.uri}
      onLoadComplete={(numberOfPages, filePath) => {
      }}
      onPageChanged={(page, numberOfPages) => {
      }}
      onError={error => {
        console.log(error);
      }}
      onPressLink={uri => {
        console.log(`Link pressed: ${uri}`);
      }}
      style={styles.pdf}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  pdf: {
    width: '100%',
    height: '89%',
  },
});

export default PdfView;
