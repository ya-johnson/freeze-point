const toolbarOptions = {
  options: ['inline', 'blockType', 'list', 'link', 'emoji', 'history'],
  inline: {
    inDropdown: false,
    className: 'post-editor-toolbar-inline',
    options: ['bold', 'italic', 'underline', 'strikethrough']
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H2', 'H3', 'Blockquote'],
    dropdownClassName: 'post-editor-toolbar-dropdown',
  },
  list: {
    inDropdown: false,
    className: undefined,
    options: ['unordered', 'ordered']
  },
  link: {
    inDropdown: false,
    className: 'post-editor-toolbar-item',
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_blank',
    options: ['link', 'unlink']
  },
  emoji: {
    className: 'post-editor-toolbar-item',
    popupClassName: undefined,
  },
  history: {
    className: 'post-editor-toolbar-item',
    options: ['undo', 'redo']
  },
}


export {
  toolbarOptions
}