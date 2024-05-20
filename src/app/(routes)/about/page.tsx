import { LuPaintbrush2, LuCode2, LuBookOpen } from "react-icons/lu";

export default function About() {
  return (
    <main className="px-8 max-w-screen-md flex flex-col py-4">
      <h1 className="text-xl font-semibold mb-3">About</h1>

      <p>ようこそ、四字熟語.comへ！</p>

      <p className="mt-4">
        四字熟語.comは、毎日新しい四字熟語を紹介するサイトです。
      </p>

      <ul className="mt-4">
        <li className="mt-2 flex items-center">
          <LuBookOpen className="mr-2" />
          Data:
          <a
            href="https://www.weblio.jp"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold ml-2"
          >
            Weblio
          </a>
          から取得しています。
        </li>

        <li className="mt-2 flex items-center">
          <LuCode2 className="mr-2" />
          Source code:
          <a
            href="https://github.com/egegungordu/yojijukugo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold ml-2"
          >
            GitHub
          </a>
          でご覧いただけます。
        </li>

        <li className="mt-2 flex items-center">
          <LuPaintbrush2 className="mr-2" />
          Inspiration:
          <a
            href="https://x.com/takawo/status/1717099008777465957"
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-semibold ml-2"
          >
            @takawo
          </a>
          さんの素晴らしい作品から得ています。
        </li>
      </ul>

      <p className="mt-4">
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
