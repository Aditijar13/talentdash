import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <p className="text-[80px] mb-4">🔍</p>
      <h1 className="text-[32px] font-black text-white mb-3">Page Not Found</h1>
      <p className="text-[16px] text-white/50 mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF5A5F] to-[#FF7060] text-white font-bold rounded-xl hover:from-[#E04E53] hover:to-[#E06050] transition-all"
      >
        Back to Home
      </Link>
    </div>
  )
}
