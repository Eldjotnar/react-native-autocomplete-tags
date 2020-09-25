import AutocompleteTags from '../index';
import React, { useState } from 'react';

const suggestions = ['apple', 'orange', 'banana', 'kiwi'];

const SimpleExample = () => {
  const [tags, setTags] = useState<string[]>([]);

  const labelExtractor = (tag: string) => tag;

  return (
    <AutocompleteTags
      tags={tags}
      suggestions={suggestions}
      onChangeTags={setTags}
      labelExtractor={labelExtractor}
    />
  );
};

export default SimpleExample;
