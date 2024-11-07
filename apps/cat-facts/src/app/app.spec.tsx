import { render } from '@testing-library/react';

import { App} from './app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});
const Wrapper = ({ children }: { children: React.ReactElement }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Wrapper><App /></Wrapper>);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(
      <Wrapper>
        <App />
      </Wrapper>
    );
    expect(getByText(/Cat Breeds/gi)).toBeTruthy();
  });
});
