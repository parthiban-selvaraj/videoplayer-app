import React from 'react';
import PlaylistItem from '../PlaylistItem';
import withLink from '../hoc/withLink';
import StyledPlaylistItems from '../styles/StyledPlaylistItems';

// sending PlaylistItem dynamically. we can send any other component which is matching with HOC
const PlaylistItemWithLink = withLink(PlaylistItem)

const PlaylistItems = ({ videos, active }) => {
  return (
    <StyledPlaylistItems>
      {videos.map((video) => (
        <PlaylistItemWithLink
          key={video.id}
          video={video}
          active={video.id === active.id ? true : false}
          played={video.played}
        />
      ))}
    </StyledPlaylistItems>
  )
}

export default PlaylistItems