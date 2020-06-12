import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';

import FloatingView from 'components/FloatingView';
import Text from 'components/Text';

import styles from './styles';

interface SubredditSelectorProps {
  open: boolean;
  subreddits: any[] | undefined | null;
  selectedSubreddit?: string;
  toggleOpen: () => void;
  onSelect?: (subreddit: any) => void;
}

const SubredditSelector = ({
  open = false,
  subreddits = [],
  selectedSubreddit,
  toggleOpen,
  onSelect,
}: SubredditSelectorProps) => {
  return (
    <View style={styles.subredditSelector}>
      <TouchableOpacity onPress={toggleOpen}>
        <FloatingView style={styles.subredditDropdownTextContainer}>
          <Text style={styles.subredditDropdownText}>/r/</Text>
        </FloatingView>
      </TouchableOpacity>
      {open ? (
        <View
          style={[
            styles.subredditList,
            open ? styles.visibleList : styles.hiddenList,
          ]}>
          <View style={styles.dropdownArrow} />
          <FloatingView style={styles.outerList} animated noPadding>
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
                  <TouchableOpacity
                    key={`${index}`}
                    onPress={() => onSelect?.(item)}>
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
        </View>
      ) : null}
    </View>
  );
};

export default SubredditSelector;
