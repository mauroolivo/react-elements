import { Content } from '@/components/dashboard/Content';
import { Header } from '@/components/dashboard/Header';
import { Main } from '@/components/dashboard/Main';
import { UserProvider } from '@/components/dashboard/UserProvider';

export default function Page() {
  return (
    <>
      <UserProvider>
        <Header />
        <Main>
          <Content />
        </Main>
      </UserProvider>
    </>
  );
}
