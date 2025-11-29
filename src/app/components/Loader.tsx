import Image from 'next/image';

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Image
        src="/ring.svg"
        alt="loading"
        className="w-12 h-12"
        width={48}
        height={48}
      />
    </div>
  );
}
