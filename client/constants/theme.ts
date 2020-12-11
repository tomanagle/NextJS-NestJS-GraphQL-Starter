/*
 * Bumbag theme docs: https://bumbag.style/theming/
 */

import { ThemeConfig, css } from 'bumbag';
import {
  faComment,
  faThumbsUp,
  faBookmark,
  faTrashAlt,
  faPlusSquare,
  faFileCode,
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faShareSquare,
  faImage
} from '@fortawesome/free-regular-svg-icons';
import {
  faMarkdown,
  faJs,
  faGithub,
  faReddit,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';

const theme: ThemeConfig = {
  Popover: {
    Title: {
      styles: {
        base: {
          paddingRight: 'major-1'
        }
      }
    }
  },
  Tooltip: {
    Content: {
      styles: {
        base: css`
          z-index: 999;
        `
      }
    }
  },
  PageWithSidebar: {
    styles: {
      base: css`
        z-index: 10;
        position: relative;
      `
    }
  },
  PageWithHeader: {
    styles: {
      base: css`
        display: flex;
        flex-direction: column;
        .bb-PageWithHeaderContent {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .bb-PageContentWrapper {
          flex-grow: 1;
          flex-shrink: 1;
          flex-basis: 0%;
        }
      `
    }
  },
  Container: {
    styles: {
      fluid: {
        maxWidth: '100%'
      }
    }
  },
  Icon: {
    styles: {
      base: {
        color: 'text300'
      }
    },
    iconSets: [
      {
        icons: [
          faComment,
          faThumbsUp,
          faBookmark,
          faTrashAlt,
          faPlusSquare,
          faFileCode,
          faArrowAltCircleLeft,
          faArrowAltCircleRight,
          faShareSquare,
          faImage
        ],
        prefix: 'r-',
        type: 'font-awesome'
      },
      {
        icons: [faMarkdown, faJs, faGithub, faReddit, faGoogle],
        prefix: 'b-',
        type: 'font-awesome'
      }
    ]
  },
  global: {
    fontSize: 16,
    styles: {
      base: {
        color: 'text300'
      }
    }
  },
  fonts: {
    // default: 'Comic Sans MS'
  },
  palette: {
    primary: '#d504f8'
  },
  breakpoints: {
    mobile: 520,
    tablet: 960
  },
  SelectMenu: {
    styles: {
      base: {
        backgroundColor: 'white'
      }
    }
  },
  Button: {
    styles: {
      base: {
        color: 'white'
      },
      ghost: {
        color: 'primary',
        borderColor: 'primary',
        borderWidth: '1px',
        borderStyle: 'solid'
      },
      outlined: {
        borderColor: 'primary',
        borderWidth: '1px',
        borderStyle: 'solid'
      }
    },

    defaultProps: {
      palette: 'primary'
    }
  },
  Text: {
    styles: {
      base: {
        color: 'text300'
      }
    }
  },
  Heading: {
    styles: {
      base: {
        color: 'text300'
      }
    },

    h3: {
      styles: {
        base: {
          color: 'text300',
          fontSize: '1.25rem'
        }
      }
    }
  }
};

export default theme;
