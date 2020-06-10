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
import SubredditSelector from 'components/SubredditSelector';
import CommentDrawer from 'components/CommentDrawer';

import { password, username, basicAuthPair } from './credentials';

// TODO: Fix linting - thinks this cannot be resolved
import userIcon from 'assets/icons/png/24/basic/user.png';
import commentTextIcon from 'assets/icons/png/24/chatting/comment-text.png';

import styles from './styles';
import { RedditListingResponse, RedditPost } from 'types';

declare const global: { HermesInternal: null | {} };

const initialPostDataState: {
  listing: RedditListingResponse;
  count: number;
} = {
  listing: {
    kind: null,
    data: null,
  },
  count: 0,
};
const initialSubredditsState = { subreddits: [] };

const App = () => {
  // TODO: Getting unweildy, redux soon.
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [postData, setPostData] = useState<typeof initialPostDataState>(
    initialPostDataState,
  );
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCommentDrawerVisible, setIsCommentDrawerVisible] = useState(false);
  const [subredditData, setSubredditData] = useState<{
    subreddits: any[];
    before?: string;
    after?: string;
    count?: number;
  }>(initialSubredditsState);
  const [visiblePost, setVisiblePost] = useState<RedditPost | null>(null);
  const [currentSubredditUrl, setCurrentSubredditUrl] = useState<string>('/');

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 100,
  });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any }) => {
      setVisiblePost(viewableItems[0]?.item ?? null);
      setIsDropdownVisible(false);
    },
  );

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

      const fetchSubredditContent = async (): Promise<
        RedditListingResponse
      > => {
        const res = await fetch(
          `https://oauth.reddit.com${currentSubredditUrl}hot?g=gb&raw_json=1`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        // TODO: These responses aren't super pleasant to work with. Make adapter.
        return await res.json();
      };
      const listing = await fetchSubredditContent();

      console.log(listing);

      setPostData((currentPostData) => ({
        listing,
        count: currentPostData?.count + (listing.data?.children.length ?? 0),
      }));
      // TODO: This solves this issue of title being absent on subreddit change, but feels a bit too imperative.
      // Have another look into the FlatList API.
      setVisiblePost(listing.data?.children[0] ?? null);
    };

    getSubredditContent();
  }, [currentSubredditUrl, accessToken]);

  useEffect(() => {
    const getSubreddits = async () => {
      if (!accessToken) {
        return;
      }
      const res = await fetch(
        'https://oauth.reddit.com/subreddits/mine/subscriber',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // TODO: These responses aren't super pleasant to work with. Make adapter.
      // TODO: Type def the response, particularly subreddits
      const {
        data: { children, before, after },
      } = await res.json();

      setSubredditData((currentSubredditData) => ({
        subreddits: children,
        before,
        after,
        count: currentSubredditData?.count + children.length ?? 0,
      }));
    };

    getSubreddits();
  }, [accessToken]);

  // TODO: One of the effect hooks sort of duplicates this. Could probably be parameterized.
  const getNextItems = async () => {
    const fetchSubredditContent = async (): Promise<RedditListingResponse> => {
      const res = await fetch(
        `https://oauth.reddit.com${currentSubredditUrl}hot?g=gb&raw_json=1`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // TODO: These responses aren't super pleasant to work with. Make adapter.
      return await res.json();
    };
    const { data: fetchedData } = await fetchSubredditContent();

    setPostData((currentPostData) => ({
      listing: {
        ...currentPostData.listing,
        data: currentPostData.listing.data
          ? { ...currentPostData.listing.data, ...fetchedData }
          : null,
      },
      count: 0,
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
          {/* TODO: Break these out - this isn't actually a header.
           *  Have all the floating buttons in an ActionsOverlay component?
           */}
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
            data={postData?.listing.data?.children}
            renderItem={({
              item: {
                data: { url },
              },
            }) => {
              if (
                url &&
                ['.jpg', '.gif', '.png', '.jpeg'].some((ext) =>
                  url.includes(ext),
                )
              ) {
                return (
                  <>
                    <View style={styles.contentContainer}>
                      <Image
                        style={styles.mainImage}
                        source={{ uri: url }}
                        resizeMode="contain"
                      />
                    </View>
                  </>
                );
              } else {
                return (
                  <View style={styles.contentContainer}>
                    <Text>Not implemented</Text>
                  </View>
                );
              }
            }}
            onEndReached={() => getNextItems()}
            onEndReachedThreshold={0.5}
            keyExtractor={(_, index) => `${index}`}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={viewabilityConfig.current}
          />
          <View style={styles.footerContainer}>
            <TouchableOpacity onPress={() => setIsCommentDrawerVisible(true)}>
              <FloatingView>
                <Image style={styles.icon} source={commentTextIcon} />
              </FloatingView>
            </TouchableOpacity>
          </View>
          <SubredditSelector
            visible={isDropdownVisible}
            subreddits={subredditData?.subreddits}
            selectedSubreddit={currentSubredditUrl}
            onSelect={(subreddit) => {
              setVisiblePost(null);
              setPostData(initialPostDataState);
              setCurrentSubredditUrl(subreddit.data.url);
              setIsDropdownVisible(false);
            }}
          />
          <CommentDrawer
            visible={isCommentDrawerVisible}
            postId={visiblePost?.id}
            // These 2 are ridiculous. Add redux asap.
            accessToken={accessToken}
            subredditUrl={currentSubredditUrl}
            onClose={() => setIsCommentDrawerVisible(false)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;
