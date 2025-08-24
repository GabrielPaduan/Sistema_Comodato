import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';
import { ThemeProvider } from '@mui/material/styles';
import { LightTheme } from './shared/themes';
import { DefaultHeader } from './shared/components/DefaultHeader';

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </ThemeProvider>
  );
}