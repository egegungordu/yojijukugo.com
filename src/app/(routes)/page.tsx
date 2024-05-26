import YojijukugoCanvas from "./_components/yojijukugo-canvas";

export default function Home() {
  return (
    <main className="isolate relative h-full w-full flex">
      <div className="sm:border-r max-w-screen-sm shrink-0 w-full flex flex-col py-4">
        <div className="font-medium text-center text-muted-foreground px-4 sm:px-8">
          今日の四字熟語
        </div>

        <div className="mt-4">
          <p className="text-sm text-center">きょしんたんかい</p>

          <div className="mt-2 py-0.5">
            <div className="relative isolate overflow-hidden">
              <h2 className="text-6xl pt-1 pb-3 text-center text-balance tracking-widest px-2">
                虚心坦懐
              </h2>
            </div>
          </div>

          <p className="mt-6 px-4 sm:px-8">
            ［ト・タル］［文］［形動タリ］意気込みが盛んで、元気いっぱいなさま。「—たる女性チーム」
            [補説] 「意気軒高」と書くこともある。
          </p>
        </div>

        <div className="flex items-center justify-center mt-auto text-center text-muted-foreground text-sm px-4 sm:px-6 tracking-tighter">
          四字熟語（よじじゅくご）は、漢字4文字で構成される日本語の慣用句や成句のことを指します。
        </div>
      </div>

      <div className="overflow-hidden h-full w-full">
        <YojijukugoCanvas
          style={{
            maskImage:
              "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
            WebkitMaskImage:
              "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
          }}
          className="max-sm:hidden animate-in fade-in-0 duration-500"
        />
      </div>
    </main>
  );
}
