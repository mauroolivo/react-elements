import Analytics from './components/Analytics';
import LastDate from './components/LastDate';
import StateMachine from './components/StateMachine';
import ViewPort from './components/ScreenSize';
import AutoFocusForm from './components/AutoFocusForm';

export default function Home() {
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
