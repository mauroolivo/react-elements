import FirebaseClient from '@/components/FirebaseClient';
import RemoteConfigDemo from '@/components/RemoteConfigDemo';
import Link from 'next/link';
export default function Page() {
  return (
    <div>
      <h1>Firebase Page</h1>
      <p>This is a placeholder page for Firebase integration.</p>
      <nav>
        <ul>
          <li>
            <Link href="/firebase/signin">Sign in</Link>
          </li>
          <li>
            <Link href="/firebase/signup">Sign up</Link>
          </li>
          <li>
            <Link href="/firebase/demo">Demo (authenticated)</Link>
          </li>
          <li>
            <Link href="/firebase/logout">Sign out</Link>
          </li>
        </ul>
      </nav>
      <FirebaseClient />
      <p>Below is a demo of Firebase Remote Config:</p>
      <RemoteConfigDemo />
    </div>
  );
}
