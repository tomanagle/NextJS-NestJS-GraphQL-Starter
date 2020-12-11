import { useColorMode, Stack, Button, Set, Text } from 'bumbag';

function ToggleColorMode() {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <Stack>
      <Set>
        <Button onClick={() => setColorMode('default')}>Light</Button>
        <Button onClick={() => setColorMode('dark')}>Dark</Button>
      </Set>
    </Stack>
  );
}

export default ToggleColorMode;
