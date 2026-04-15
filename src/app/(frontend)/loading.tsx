export default function Loading() {
  return (
    <div className="min-h-screen bg-[#FBFCFC] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-ppt-blue/10" />
          <div className="absolute inset-0 rounded-full border-4 border-ppt-pink border-t-transparent animate-spin" />
        </div>
        <p className="text-ppt-blue font-semibold text-sm tracking-wide">Wird geladen…</p>
      </div>
    </div>
  );
}
