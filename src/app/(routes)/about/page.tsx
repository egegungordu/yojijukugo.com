import { LuPaintbrush2, LuCode2, LuBookOpen } from "react-icons/lu";

export default function About() {
  return (
    <main className="max-w-screen-sm font-inter text-sm flex flex-col py-4">
      <h1 className="px-4 sm:px-8 text-xl font-semibold mb-3">About</h1>

      <p className="px-4 sm:px-8">ようこそ、四字熟語.comへ！</p>

      <p className="mt-4 px-4 sm:px-8">
        四字熟語.comは、毎日新しい四字熟語を紹介するサイトです。
      </p>

      <ul className="mt-4 bg-secondary px-4 sm:px-8 pt-2 pb-4">
        <li className="mt-2">
          <LuBookOpen className="mr-2 inline" />
          Data:{' '}
          <a
            href="https://www.weblio.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold mr-1"
          >
            Weblio
          </a>
          から取得しています。
        </li>

        <li className="mt-2">
          <LuCode2 className="mr-2 inline" />
          Source code:{' '}
          <a
            href="https://github.com/egegungordu/yojijukugo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold mr-1"
          >
            GitHub
          </a>
          でご覧いただけます。
        </li>

        <li className="mt-2">
          <LuPaintbrush2 className="mr-2 inline" />
          Inspiration:{' '}
          <a
            href="https://x.com/takawo/status/1717099008777465957"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold mr-1"
          >
            @takawo
          </a>
          さんの素晴らしい作品から得ています。
        </li>
      </ul>

      <p className="mt-4 px-4 sm:px-8">
        ご質問やご意見は、GitHubのIssues又は以下のメールアドレスまでご連絡ください。
        <br />
        <a
          href="mailto:egegungorduu@hotmail.com"
          className="underline font-semibold"
        >
          egegungorduu@hotmail.com
        </a>
      </p>
    </main>
  );
}
