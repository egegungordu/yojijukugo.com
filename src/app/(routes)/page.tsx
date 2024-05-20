import YojijukugoCanvas from "./_components/yojijukugo-canvas";

export default function Home() {
  return (
    <main className="isolate relative h-full flex">
      <div className="border-r border-r-black px-8 max-w-screen-md flex flex-col py-4">
        <div className="font-medium text-center text-neutral-700">
          今日の四字熟語
        </div>

        <div className="mt-4">
          <p className="text-sm text-center">きょしんたんかい</p>
          <h2 className="text-6xl text-center mt-1">虚心坦懐</h2>
          <p className="pt-5 mt-3">
            ［ト・タル］［文］［形動タリ］意気込みが盛んで、元気いっぱいなさま。「—たる女性チーム」
            [補説] 「意気軒高」と書くこともある。
          </p>
        </div>

        <div className="flex items-center justify-center mt-auto text-center text-neutral-600 text-sm">
          四字熟語（よじじゅくご）は、漢字4文字で構成される日本語の慣用句や成句のことを指します。
        </div>
      </div>

      <YojijukugoCanvas />
    </main>
  );
}
