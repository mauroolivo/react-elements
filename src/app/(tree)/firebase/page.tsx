import FirebaseClient from "@/components/FirebaseClient";
import RemoteConfigDemo from "@/components/RemoteConfigDemo";
export default function Page() {
  return (
    <div>
      <h1>Firebase Page</h1>
      <p>This is a placeholder page for Firebase integration.</p>
      <FirebaseClient />
        <p>Below is a demo of Firebase Remote Config:</p>
      <RemoteConfigDemo />
    </div>
  );
}
