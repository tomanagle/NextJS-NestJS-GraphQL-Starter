import { Box } from 'bumbag';
import ToggleColorMode from 'components/ToggleColorMode';

function Footer() {
  return (
    <Box use="footer" padding="major-2">
      <ToggleColorMode />
    </Box>
  );
}

export default Footer;
