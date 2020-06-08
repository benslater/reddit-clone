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
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import base64 from 'base-64';

import { password, username, basicAuthPair } from './credentials';

declare const global: { HermesInternal: null | {} };

const userIcon = require('./assets/icons/png/24/basic/user.png');

const deviceWidth = Dimensions.get('screen').width;

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<{
    posts: any[];
    before: string;
    after: string;
    count: number;
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

  useEffect(() => {
    if (accessToken && !postData) {
      getNextItems();
    }
  });

  const getNextItems = async () => {
    const res = await fetch(
      `https://oauth.reddit.com/r/funny/hot?g=gb&raw_json=1&after=${postData?.after}`,
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
      posts: [...(postData?.posts ?? []), ...children],
      before,
      after,
      count: postData?.count + children.length ?? 0,
    });
  };

  if (!accessToken) {
    // TODO: Simple solution, replace with something Lottie-based
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // TODO: Create stylesheet and import styles
  // TODO: Componentise the floating views. Allow custom style props but provide default background/borderRadius/padding etc
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#913993' }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={postData?.posts.filter(
              (child: any) => child.data.post_hint === 'image',
            )}
            renderItem={({
              item: {
                data: { url: uri, title },
              },
            }) => (
              <>
                <View style={{ position: 'relative', width: deviceWidth }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingTop: 20,
                      paddingRight: 20,
                      paddingBottom: 0,
                      paddingLeft: 20,
                      zIndex: 100,
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#F8F8F8',
                        opacity: 0.4,
                        height: 50,
                        width: 50,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 2,
                        borderRadius: 5,
                        padding: 10,
                      }}>
                      <Image
                        style={{ height: 30, width: 30 }}
                        source={userIcon}
                      />
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: '#F8F8F8',
                        opacity: 0.4,
                        maxHeight: 100,
                        maxWidth: '50%',
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 2,
                        borderRadius: 5,
                        padding: 10,
                        justifyContent: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: 'Actor',
                        }}>
                        {title}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#F8F8F8',
                        opacity: 0.4,
                        height: 50,
                        width: 50,
                        shadowColor: '#000',
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.2,
                        shadowRadius: 1.41,
                        elevation: 2,
                        borderRadius: 5,
                        padding: 10,
                      }}>
                      <Text style={{ fontSize: 24, textAlign: 'center' }}>
                        /r/
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Image
                    resizeMode="contain"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                    source={{ uri }}
                  />
                </View>
              </>
            )}
            onEndReached={() => getNextItems()}
            onEndReachedThreshold={0.5}
            keyExtractor={(_, index) => `${index}`}
            horizontal
            pagingEnabled
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
