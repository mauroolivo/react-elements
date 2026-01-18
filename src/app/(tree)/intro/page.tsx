import Analytics from '@/components/Analytics';
import LastDate from '@/components/LastDate';
import StateMachine from '@/components/StateMachine';
import ViewPort from '@/components/ScreenSize';
import AutoFocusForm from '@/components/AutoFocusForm';

export default function page() {
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
