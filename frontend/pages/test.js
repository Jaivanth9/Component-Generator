export default function FinalGradientTest() {
  return (
    <>
      <style jsx global>{`
        html, body, #__next {
          height: 100%;
          margin: 0;
          padding: 0;
          background: linear-gradient(to bottom right, #3b82f6, #8b5cf6, #ec4899);
        }
      `}</style>

      <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-white text-4xl font-bold shadow-md p-6 rounded-lg bg-black/30">
          ✅ FINAL GRADIENT TEST
        </h1>
      </div>
    </>
  );
}
