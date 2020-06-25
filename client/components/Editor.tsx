import * as React from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually

const mdParser = new MarkdownIt(/* Markdown-it options */);

function Editor(handleChange) {
  return (
    <MdEditor
      value=""
      style={{ height: '500px' }}
      renderHTML={text => mdParser.render(text)}
      onChange={handleChange}
    />
  );
}

export default Editor;
