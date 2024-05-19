"use client";

import useAnimationFrame from "@/hooks/use-animation-frame";
import useWindowMousePosition from "@/hooks/use-window-mouse-position";
import { useLayoutEffect, useRef } from "react";
import useSize from "@react-hook/size";
import Link from "next/link";

const LINES = [
  ["多岐亡羊", "朝三暮四", "牛飲馬食", "羊頭狗肉"],
  ["一期一会", "画竜点睛", "因果応報", "風林火山"],
  ["明鏡止水", "諸行無常", "魑魅魍魎", "山紫水明"],
  ["花鳥風月", "器用貧乏", "不撓不屈", "一心不乱"],
  ["百花繚乱", "鶏口牛後", "森羅万象", "一蓮托生"],
  ["五風十雨", "泰然自若", "温故知新", "行住坐臥"],
  ["呉越同舟", "鏡花水月", "満身創痍", "唯我独尊"],
  ["慇懃無礼", "疑心暗鬼", "馬耳東風", "切磋琢磨"],
  ["一朝一夕", "付和雷同", "喜怒哀楽", "行雲流水"],
];

declare global {
  interface CanvasRenderingContext2D {
    fillVerticalText(
      text: string,
      x: number,
      y: number,
      verticalSpacing: number,
    ): void;
  }
}

if (typeof CanvasRenderingContext2D !== "undefined") {
  CanvasRenderingContext2D.prototype.fillVerticalText = function (
    text,
    x,
    y,
    verticalSpacing,
  ) {
    for (var i = 0; i < text.length; i++) {
      this.fillText(text[i], x, y + i * verticalSpacing);
    }
  };
}

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useSize(canvasRef);

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    canvas.width = width;
    canvas.height = height;
  }, [width, height]);

  const mousePos = useWindowMousePosition();

  useAnimationFrame(({ time, delta }) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    if (!ctx) {
      return;
    }

    ctx.resetTransform();
    ctx.textRendering = "optimizeSpeed";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // const scale = 1 + Math.sin(time) / 10;
    // ctx.scale(scale, scale);
    // ctx.fillStyle = "black";
    // ctx.fillRect(0, 0, canvas.width, 124);
    // ctx.fillStyle = "white";
    // ctx.fillText(`臨時黄変`, 0, 124 - 16);
    // ctx.resetTransform();
    //
    // const scale2 = 1 + Math.cos(time) / 10;
    // ctx.scale(scale2, scale2);
    // const offset = 124 * scale / scale2;
    // ctx.fillStyle = "white";
    // ctx.fillRect(0, offset, canvas.width, 124);
    // ctx.fillStyle = "black";
    // ctx.fillText(`臨時黄変`, 0, offset + 124 - 16);

    const baseSize = 100;
    const padding = 1;
    ctx.font = `${baseSize}px serif`;

    let lastOffset = 0;
    for (let i = 0; i < LINES.length; i++) {
      const scale =
        1 + (Math.sin(time / 5 + i * 5 + 11) / 2) * Math.tanh(i + 0.4);
      const offset = lastOffset / scale;

      ctx.scale(scale * 1.5, scale);

      ctx.fillStyle = "black";
      ctx.fillRect(
        (lastOffset + baseSize * scale) / scale - 1,
        0,
        20,
        canvas.height / scale,
      );

      let topOffset = 0;
      ctx.translate(0, canvas.height / 2 + 124 * Math.sin(i * 2 + time / 5));
      for (let j = 0; j < LINES[i].length; j++) {
        const xScale = 1 + Math.sin(time + j / 2) / 2;
        // ctx.scale(xScale, 1);
        const textWidth = ctx.measureText(LINES[i][j]).width;
        ctx.fillStyle = j % 2 === 0 ? "black" : "white";
        ctx.fillRect(offset, topOffset, baseSize, textWidth + 16);
        ctx.fillStyle = j % 2 === 0 ? "white" : "black";
        ctx.fillVerticalText(
          LINES[i][j],
          offset,
          topOffset + baseSize - 8,
          baseSize,
        );
        topOffset += textWidth + 16;
      }
      topOffset = -topOffset;
      // draw one more time to wrap around
      for (let j = 0; j < LINES[i].length; j++) {
        const xScale = 1 + Math.sin(time + j / 2) / 2;
        // ctx.scale(xScale, 1);
        const textWidth = ctx.measureText(LINES[i][j]).width;
        ctx.fillStyle = j % 2 === 0 ? "black" : "white";
        ctx.fillRect(offset, topOffset, baseSize, textWidth + 16);
        ctx.fillStyle = j % 2 === 0 ? "white" : "black";
        ctx.fillVerticalText(
          LINES[i][j],
          offset,
          topOffset + baseSize - 8,
          baseSize,
        );
        topOffset += textWidth + 16;
      }
      // const lastElement = LINES[i][LINES[i].length - 1];
      // const lastElementWidth = ctx.measureText(lastElement).width;
      // ctx.fillText(lastElement, -lastElementWidth, offset + baseSize - padding);
      ctx.resetTransform();
      lastOffset += baseSize * scale + padding;
    }
  });

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

      <canvas
        ref={canvasRef}
        className="w-full h-full overflow-hidden object-contain"
        style={{
          // maskImage: "linear-gradient(180deg, white 80%, rgba(0,0,0,0) 99%)",
          maskImage:
            "radial-gradient(circle at 0 0,white 30%, rgba(0,0,0,0) 100%)",
        }}
      />
    </main>
  );
}
