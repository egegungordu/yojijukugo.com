"use client";

import useAnimationFrame from "@/hooks/use-animation-frame";
import useWindowMousePosition from "@/hooks/use-window-mouse-position";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import useSize from "@react-hook/size";

const LINES = [
  [
    "多岐亡羊",
    "たきぼうよう",
    "朝三暮四",
    "ちょうさんぼし",
    "牛飲馬食",
    "ぎゅういんばしょく",
    "羊頭狗肉",
    "ようとうくにく",
  ],
  [
    "一期一会",
    "いちごいちえ",
    "画竜点睛",
    "がりょうてんせい",
    "因果応報",
    "いんがおうほう",
    "風林火山",
    "ふうりんかざん",
  ],
  [
    "明鏡止水",
    "めいきょうしすい",
    "諸行無常",
    "しょぎょうむじょう",
    "魑魅魍魎",
    "ちみもうりょう",
    "山紫水明",
    "さんしすいめい",
  ],
  [
    "花鳥風月",
    "かちょうふうげつ",
    "器用貧乏",
    "きようびんぼう",
    "不撓不屈",
    "ふとうふくつ",
    "一心不乱",
    "いっしんふらん",
  ],
  [
    "百花繚乱",
    "ひゃっかりょうらん",
    "鶏口牛後",
    "けいこうぎゅうご",
    "森羅万象",
    "しんらばんしょう",
    "一蓮托生",
    "いちれんたくしょう",
  ],
  [
    "五風十雨",
    "ごくうじゅうう",
    "泰然自若",
    "たいぜんじじゃく",
    "温故知新",
    "おんこちしん",
    "行住坐臥",
    "ぎょうじゅうざが",
  ],
  [
    "呉越同舟",
    "ごえつどうしゅう",
    "鏡花水月",
    "きょうかすいげつ",
    "満身創痍",
    "まんしんそうい",
    "唯我独尊",
    "ゆいがどくそん",
  ],
  [
    "慇懃無礼",
    "いんぎんぶれい",
    "疑心暗鬼",
    "ぎしんあんき",
    "馬耳東風",
    "ばじとうふう",
    "切磋琢磨",
    "せっさたくま",
  ],
  [
    "一朝一夕",
    "いっちょういっせき",
    "付和雷同",
    "ふわらいどう",
    "喜怒哀楽",
    "きどあいらく",
    "行雲流水",
    "こううんりゅうすい",
  ],
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

function getFontFamily() {
  if (typeof document === "undefined") {
    return "";
  }
  return document.documentElement.dataset.fontFamily;
}

export default function YojijukugoCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, height] = useSize(canvasRef);
  const fontFamily = getFontFamily();
  const baseSize = 104;
  const padding = 1;
  const mousePos = useWindowMousePosition();
  const drawScene = useMemo(
    () => (time: number, ctx: CanvasRenderingContext2D) => {
      ctx.font = `${baseSize}px ${fontFamily}`;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      let lastOffset = 0;
      let mouseXRemainder =
        mousePos.current[0] - ctx.canvas.getBoundingClientRect().left;
      for (let i = 0; i < LINES.length; i++) {
        const scale =
          1 + (Math.sin(time / 5 + i * 11 + 7) / 1.5) * Math.tanh(i + 0.4);
        const offset = lastOffset / scale;

        const yTranslate =
          ctx.canvas.height / 2 + 124 * Math.sin(i * 2 + time / 5);
        ctx.translate(0, yTranslate);

        ctx.scale(scale * 1.5, scale);

        ctx.fillStyle = "black";
        ctx.fillRect(
          (lastOffset + baseSize * scale) / scale - 1,
          -yTranslate / scale,
          20,
          ctx.canvas.height / scale,
        );

        const mouseInside = mouseXRemainder > 0 && mouseXRemainder < baseSize * scale * 1.5;
        mouseXRemainder -= baseSize * scale * 1.5;

        let topOffset = 0;
        for (let j = 0; j < LINES[i].length; j++) {
          const jj = j % (LINES[i].length / 2);
          if (jj === 0) {
            topOffset = -topOffset;
          }
          const flip = Math.sin(time / 4 + (jj * 3 + i * 2)) > 0.7;
          const kanji = LINES[i][jj * 2];
          const hiragana = LINES[i][jj * 2 + 1];
          const hiraganaWidth = ctx.measureText(hiragana).width;
          const kanjiWidth = ctx.measureText(kanji).width;
          ctx.fillStyle = mouseInside !== (jj % 2 === 0) ? "black" : "white";
          ctx.fillRect(offset, topOffset, baseSize, kanjiWidth + 16);
          ctx.fillStyle = mouseInside !== (jj % 2 === 0) ? "white" : "black";
          ctx.save();
          const newScale = flip ? kanjiWidth / hiraganaWidth : 1;
          ctx.scale(1, newScale);
          ctx.fillVerticalText(
            flip ? hiragana : kanji,
            offset,
            topOffset / newScale + baseSize - 8,
            baseSize,
          );
          ctx.restore();
          topOffset += kanjiWidth + 16;
        }
        topOffset = -topOffset;
        ctx.resetTransform();
        lastOffset += baseSize * scale + padding;
      }

      ctx.resetTransform();
    },
    [fontFamily, baseSize, padding],
  );

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

  useAnimationFrame(({ time }) => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    if (!ctx) {
      return;
    }

    drawScene(time, ctx);
  });

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full overflow-hidden object-contain"
      style={{
        maskImage:
          "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
        WebkitMaskImage:
          "radial-gradient(circle at 0 0,white 50%, rgba(0,0,0,0) 100%)",
      }}
    />
  );
}
