/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  Image,
  Dimensions,
  FlatList,
} from 'react-native';

import base64 from 'base-64';
import { password, username, basicAuthPair } from './credentials';

declare const global: { HermesInternal: null | {} };

const deviceWidth = Dimensions.get('screen').width;

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<{
    posts: any[];
    before: string;
    after: string;
  } | null>(null);

  useEffect(() => {
    if (!accessToken) {
      const getAccessToken = async () => {
        const url = `https://www.reddit.com/api/v1/access_token?grant_type=password&username=${username}&password=${password}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${base64.encode(basicAuthPair)}`,
          },
        });
        const { access_token: token } = await res.json();
        setAccessToken(token);
      };

      getAccessToken();
    }
  }, [accessToken]);

  const getNextItems = async () => {
    const res = await fetch(
      `https://oauth.reddit.com/r/funny/hot?g=gb&after=${postData?.after}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // TODO: Type def the response, particularly posts
    const {
      data: { children, before, after },
    } = await res.json();

    setPostData({
      posts: [
        ...(postData?.posts ?? []),
        ...children.filter((child: any) => child.data.post_hint === 'image'),
      ],
      before,
      after,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: 'skyblue' }}>
          <Button title="Click to fetch /r/funny" onPress={getNextItems} />
          <Text>Token: {accessToken || 'fetching...'}</Text>
        </View>
        <View style={{ flex: 4, backgroundColor: 'steelblue' }}>
          <FlatList
            style={{ backgroundColor: 'pink' }}
            data={postData?.posts}
            renderItem={({ item }) => (
              <>
                <View style={{ position: 'relative', width: deviceWidth }}>
                  <Image
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    source={{ uri: item.data.url }}
                  />
                </View>
              </>
            )}
            onEndReached={() => getNextItems()}
            onEndReachedThreshold={0.5}
            keyExtractor={(item) => item.name}
            horizontal
            pagingEnabled
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
