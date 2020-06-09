/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import base64 from 'base-64';

import Text from 'components/Text';
import FloatingView from 'components/FloatingView';

import { password, username, basicAuthPair } from './credentials';

// TODO: Fix linting - thinks this cannot be resolved
import userIcon from 'assets/icons/png/24/basic/user.png';

declare const global: { HermesInternal: null | {} };

import styles from './styles';
import SubredditSelector from 'components/SubredditSelector';

const App = () => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<{
    posts: any[];
    before: string;
    after: string;
    count: number;
  } | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [subredditData, setSubredditData] = useState<{
    subreddits: any[];
    before: string;
    after: string;
    count: number;
  } | null>(null);
  const [visiblePost, setVisiblePost] = useState<any | null>(null);
  const [currentSubredditUrl, setCurrentSubredditUrl] = useState<string | null>(
    '/r/all/',
  );

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 100,
  });
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    setVisiblePost(viewableItems[0]?.item ?? null);
  });

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
    const getSubredditContent = async () => {
      if (!currentSubredditUrl || !accessToken) {
        return;
      }

      const res = await fetch(
        `https://oauth.reddit.com${currentSubredditUrl}hot?g=gb&raw_json=1`,
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

      setPostData((currentPostData) => ({
        posts: [...(currentPostData?.posts ?? []), ...children],
        before,
        after,
        count: currentPostData?.count + children.length ?? 0,
      }));
    };

    getSubredditContent();
  }, [currentSubredditUrl, accessToken]);

  useEffect(() => {
    const getSubreddits = async () => {
      if (!accessToken) {
        return;
      }
      const res = await fetch('https://oauth.reddit.com/subreddits/default', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // TODO: Type def the response, particularly posts
      const {
        data: { children, before, after },
      } = await res.json();

      setSubredditData((currentSubredditData) => ({
        subreddits: [...(currentSubredditData?.subreddits ?? []), ...children],
        before,
        after,
        count: currentSubredditData?.count + children.length ?? 0,
      }));
    };

    getSubreddits();
  }, [accessToken]);

  // TODO: One of the effect hooks sort of duplicates this. Could probably be parameterized.
  const getNextItems = async () => {
    const res = await fetch(
      `https://oauth.reddit.com${currentSubredditUrl}hot?g=gb&raw_json=1&after=${postData?.after}`,
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

    setPostData((currentPostData) => ({
      posts: [...(currentPostData?.posts ?? []), ...children],
      before,
      after,
      count: currentPostData?.count + children.length ?? 0,
    }));
  };

  if (!accessToken) {
    // TODO: Simple solution, replace with something Lottie-based
    return <ActivityIndicator style={styles.fullscreen} />;
  }

  return (
    <SafeAreaView style={styles.fullscreen}>
      <View style={[styles.fullscreen, styles.purpleBackground]}>
        <View style={styles.fullscreen}>
          <View style={styles.headerContainer}>
            <TouchableOpacity>
              <FloatingView>
                <Image style={styles.icon} source={userIcon} />
              </FloatingView>
            </TouchableOpacity>
            {/* TODO: This fundamentally doesn't look good. Redesign. Maybe allow tap to expand? */}
            {visiblePost && (
              <FloatingView style={styles.titleContainer}>
                <Text>{visiblePost.data.title}</Text>
              </FloatingView>
            )}
            <TouchableOpacity
              onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
              <FloatingView>
                <Text style={styles.subredditDropdownText}>/r/</Text>
              </FloatingView>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            pagingEnabled
            data={postData?.posts.filter(
              (child: any) => child.data.post_hint === 'image',
            )}
            renderItem={({
              item: {
                data: { url: uri },
              },
            }) => (
              <>
                <View style={styles.contentContainer}>
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
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
          />
          <SubredditSelector
            visible={isDropdownVisible}
            subreddits={subredditData?.subreddits}
            onSelect={(subreddit) => {
              setVisiblePost(null);
              setPostData(null);
              setCurrentSubredditUrl(subreddit.data.url);
              setIsDropdownVisible(false);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
