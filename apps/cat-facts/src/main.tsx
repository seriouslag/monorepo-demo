import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { App} from './app/app';
import './styles.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false, // default: true
      refetchOnWindowFocus: false, // default: true
      refetchOnReconnect: false, // default: true
      refetchInterval: false, // default: false
      refetchIntervalInBackground: false, // default: false
      retryOnMount: false, // default: true
      staleTime: Number.POSITIVE_INFINITY, // default: 0
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
);
