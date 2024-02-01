import React, {useState} from 'react';
import InstaStory from 'react-native-insta-story';
import data from '../../utils/storyData.json';
import {Button, View, Text} from 'react-native';

const Stories = () => {
  const [seenStories, setSeenStories] = useState(new Set());
  const updateSeenStories = ({story: {story_id}}) => {
    setSeenStories(prevSet => {
      prevSet.add(story_id);
      return prevSet;
    });
  };

  const handleSeenStories = async item => {
    console.log(item);
    const storyIds = [];
    seenStories.forEach(storyId => {
      if (storyId) storyIds.push(storyId);
    });
    if (storyIds.length > 0) {
      //   await fetch('myApi', {
      //     method: 'POST',
      //     body: JSON.stringify({storyIds}),
      //   });
      console.log('stories calling..');
      seenStories.clear();
    }
  };
  return (
    <InstaStory
      data={data}
      duration={10}
      onStart={item => console.log(item)}
      onClose={handleSeenStories}
      onStorySeen={updateSeenStories}
      renderTextComponent={({item, profileName}) => (
        <View>
          <Text>{profileName}</Text>
          <Text>{item.customProps?.yourCustomProp}</Text>
        </View>
      )}
      style={{marginTop: 10}}
      unPressedAvatarTextColor={'black'}
      pressedAvatarTextColor={'black'}
      showAvatarText={true}
      avatarWrapperStyle={{padding: 7}}
    />
  );
};

export default Stories;
