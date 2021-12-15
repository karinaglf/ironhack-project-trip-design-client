import { createTheme } from '@mui/material';
import { orange, teal } from '@mui/material/colors';

const customTheme = createTheme({
    palette: {
      primary: teal,
      secondary: orange,
    }
});

export default customTheme;
