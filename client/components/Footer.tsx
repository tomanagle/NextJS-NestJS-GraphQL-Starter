import { Box, List, Flex, Link as BBLink } from 'bumbag';
import Link from 'next/link';
import ToggleColorMode from 'components/ToggleColorMode';

function Footer() {
  return (
    <Box use="footer" padding="major-2">
      <Flex alignItems="center">
        <List orientation="horizontal" flex="1">
          <List.Item>
            <Link as="/policy/privacy" href="/policy/privacy" passHref>
              <BBLink>Privacy policy</BBLink>
            </Link>
          </List.Item>
          <List.Item>
            <Link as="/policy/tos" href="/policy/tos" passHref>
              <BBLink>TOS</BBLink>
            </Link>
          </List.Item>
          <List.Item>
            <Link as="/policy/cookies" href="/policy/cookies" passHref>
              <BBLink>Cookie policy</BBLink>
            </Link>
          </List.Item>
        </List>

        <ToggleColorMode />
      </Flex>
    </Box>
  );
}

export default Footer;
