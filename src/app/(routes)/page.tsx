import YojijukugoCanvas from "./_components/yojijukugo-canvas";

export default function Home() {
  return (
    <main className="isolate relative h-full flex">
      <div className="sm:border-r max-w-screen-md flex flex-col py-4">
        <div className="font-medium text-center text-muted-foreground px-4 sm:px-8">
          今日の四字熟語
        </div>

        <div className="mt-4">
          <p className="text-sm text-center">きょしんたんかい</p>

          <div
            className="mt-2 py-0.5 bg-gradient-to-r from-primary-foreground via-primary to-primary-foreground"
          >
            <div className="relative isolate overflow-hidden bg-white">
              <h2
                className="text-6xl pt-1 pb-3 text-center text-balance text-white drop-shadow-black tracking-widest px-2"
                style={{
                  background:
                    "linear-gradient(90deg, #ffffff00, #00000044, #ffffff00)",
                }}
              >
                虚心坦懐
              </h2>

              <YojijukugoCanvas
                fontSize={64}
                interactive={false}
                className="w-full absolute inset-0 -z-10 blur-[2px]"
                style={{
                  maskImage:
                    "radial-gradient(circle at center,white 60%, rgba(0,0,0,0) 110%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at center,white 60%, rgba(0,0,0,0) 110%)",
                }}
              />
            </div>
          </div>

          <p className="mt-6 px-4 sm:px-8">
            ［ト・タル］［文］［形動タリ］意気込みが盛んで、元気いっぱいなさま。「—たる女性チーム」
            [補説] 「意気軒高」と書くこともある。
          </p>
        </div>

        <div className="flex items-center justify-center mt-auto text-center text-muted-foreground text-sm px-4 sm:px-8">
          四字熟語（よじじゅくご）は、漢字4文字で構成される日本語の慣用句や成句のことを指します。
        </div>
      </div>

      <YojijukugoCanvas
        style={{
          maskImage:
            "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
        }}
        className="max-sm:hidden"
      />
    </main>
  );
}
