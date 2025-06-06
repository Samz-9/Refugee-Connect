import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='h-screen w-screen'>
    <div className='text-center font-serif text-white m-auto w-[40%] h-[50%] rounded-2xl bg-emerald-950 mt-20 border py-24 px-16' >
      <h1 className='text-3xl  drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'>404 - Page Not Found</h1>
      <p className=' drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]'>{`The page you're looking for doesn't exist.`}</p>
      <Link href="/login" className='text-blue-800 underline'>
        Go back to login page
      </Link>
    </div>
    </div>
  );
}
