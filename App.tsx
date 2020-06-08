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
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import base64 from 'base-64';

import Text from 'components/Text';
import FloatingView from 'components/FloatingView';
import Dropdown from 'components/Dropdown';

import { password, username, basicAuthPair } from './credentials';

// TODO: Fix linting - thinks this cannot be resolved
import userIcon from 'assets/icons/png/24/basic/user.png';

declare const global: { HermesInternal: null | {} };

import styles from 'styles';

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<{
    posts: any[];
    before: string;
    after: string;
    count: number;
  } | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

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
    return <ActivityIndicator style={styles.fullscreen} />;
  }

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={[styles.fullscreen, styles.purpleBackground]}>
        <View style={styles.fullscreen}>
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
                <View style={styles.contentContainer}>
                  <View style={styles.headerContainer}>
                    <TouchableOpacity>
                      <FloatingView>
                        <Image style={styles.icon} source={userIcon} />
                      </FloatingView>
                    </TouchableOpacity>
                    <FloatingView style={styles.titleContainer}>
                      <Text>{title}</Text>
                    </FloatingView>
                    <Dropdown
                      onPress={() => {
                        setIsDropdownVisible(!isDropdownVisible);
                      }}
                    />
                  </View>
                  <Image
                    style={styles.mainImage}
                    source={{ uri }}
                    resizeMode="contain"
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
          <FloatingView
            style={[
              isDropdownVisible ? styles.subredditList : styles.hiddenList,
            ]}>
            <ScrollView>
              <Text>One</Text>
              <Text>Two</Text>
              <Text>Three</Text>
            </ScrollView>
          </FloatingView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
