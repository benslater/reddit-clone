import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList } from 'react-native';

import Text from 'components/Text';

import styles from './styles';

import chevronIcon from 'assets/icons/png/24/arrows/chevron-bottom.png';

interface CommentDrawerProps {
  visible: boolean;
  postId: string;
  subredditUrl: string;
  accessToken: string;
  onClose?: () => void;
}

const CommentDrawer = ({
  visible = false,
  postId,
  subredditUrl,
  accessToken,
  onClose,
}: CommentDrawerProps) => {
  const [comments, setComments] = useState<{
    comments: any;
  }>({
    comments: [],
  });

  useEffect(() => {
    const getComments = async () => {
      if (!visible) {
        return;
      }
      const res = await fetch(
        `https://oauth.reddit.com${subredditUrl}comments/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      // TODO: These responses aren't super pleasant to work with. Make adapter.
      // TODO: Type def the response, particularly subreddits
      const [_, commentResponse] = await res.json();

      setComments({
        comments: commentResponse.data.children,
      });
    };

    getComments();
  }, [visible, postId, accessToken, subredditUrl]);

  return visible ? (
    <View style={styles.commentDrawer}>
      <View style={styles.commentDrawerHeader}>
        <TouchableOpacity style={styles.icon} onPress={onClose}>
          <Image style={styles.icon} source={chevronIcon} />
        </TouchableOpacity>
      </View>
      {!!comments.comments.length && (
        <FlatList
          data={comments.comments}
          renderItem={({ item }) => (
            <View>
              <Text>{item?.data.author}</Text>
              <Text>{item?.data.body}</Text>
              <Text>{item?.data.ups}</Text>
            </View>
          )}
          keyExtractor={(item) => item?.data.name}
        />
      )}
    </View>
  ) : null;
};

export default CommentDrawer;
