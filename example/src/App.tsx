import * as React from 'react';

import { StyleSheet, View, Text } from 'react-native';
import { Component } from './Component';
import { logger } from '@vahesaroyan/logger';

logger.log('asdasd');
export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();
  React.useEffect(() => {
    // logger.log(3, 7);
    // logger.log({
    //   a: 1,
    //   b: { c: 2 },
    // });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {1}</Text>
      <Component />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
