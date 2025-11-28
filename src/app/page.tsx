import Analytics from '@/app/components/Analytics';
import LastDate from '@/app/components/LastDate';
import StateMachine from '@/app/components/StateMachine';
import ViewPort from '@/app/components/ScreenSize';
import AutoFocusForm from '@/app/components/AutoFocusForm';

export default function Home() {
  console.log('Home page rendered');
  return (
    <>
      <ViewPort />
      <StateMachine />
      <Analytics />
      <LastDate />
      <AutoFocusForm />
    </>
  );
}
