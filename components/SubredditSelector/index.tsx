import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

import FloatingView from 'components/FloatingView';
import Text from 'components/Text';

import styles from './styles';

interface SubredditSelectorProps {
  visible: boolean;
  subreddits: any[] | undefined | null;
  selectedSubreddit?: string;
  onSelect?: (subreddit: any) => void;
}

const SubredditSelector = ({
  visible = false,
  subreddits = [],
  selectedSubreddit,
  onSelect,
}: SubredditSelectorProps) => {
  return (
    <FloatingView
      animated
      style={[
        styles.subredditList,
        visible ? styles.visibleList : styles.hiddenList,
      ]}>
      <View style={styles.dropdownArrow} />
      <FlatList
        style={styles.innerList}
        data={[
          { data: { display_name_prefixed: 'Front Page', url: '/' } },
          { data: { display_name_prefixed: 'all', url: '/r/all/' } },
          ...(subreddits ?? []),
        ]}
        renderItem={({ item, index }) => {
          const {
            data: { display_name_prefixed, url },
          } = item;
          return (
            <TouchableOpacity key={`${index}`} onPress={() => onSelect?.(item)}>
              <View
                style={[
                  styles.textContainer,
                  selectedSubreddit === url && styles.highlighted,
                ]}>
                <Text>{display_name_prefixed}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        keyExtractor={({ data: { display_name_prefixed } }) =>
          display_name_prefixed
        }
      />
    </FloatingView>
  );
};

export default SubredditSelector;
