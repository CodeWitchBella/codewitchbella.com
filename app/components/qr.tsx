// @ts-expect-error
import qr from "cue-are";
import React, { useEffect, useMemo, useRef, useState } from "react";

export function qrPaymentString({
  amount,
  message,
  account,
}: {
  amount?: number;
  message?: string;
  account: string;
}) {
  try {
    let spayd = "SPD*1.0*ACC:" + iban(account) + "*CC:CZK";
    if (amount) spayd += "*AM:" + amount;
    if (message) spayd += "*MSG:" + message;
    return spayd;
  } catch {
    return null;
  }
}

export function iban(account: string) {
  const [number, bank] = account.replace(/[ -]/g, "").split("/");
  const acc = bank + number.padStart(16, "0");
  const checksum = (98 - Number(BigInt(acc + "123500") % 97n) + "").padStart(
    2,
    "0",
  );
  return "CZ" + checksum + acc;
}

export function QrPayment({
  spayd,
  width = 250,
}: {
  spayd: string;
  width?: number;
}) {
  const code = useMemo(() => qr(spayd), [spayd]);
  if (!code || !spayd) return null;
  return <QrManual data={code} width={width} />;
}

function QrManual({ data, width }: { data: (0 | 1)[][]; width: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ratio, setRatio] = useState(1);
  useEffect(() => {
    setRatio(window.devicePixelRatio);
    window.addEventListener("resize", listener);
    return () => void window.removeEventListener("resize", listener);
    function listener() {
      setRatio(window.devicePixelRatio);
    }
  }, []);

  const elementSize = Math.floor(width + width / data.length);
  const canvasSize = Math.ceil(elementSize * ratio);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvasSize, canvasSize);
    ctx.fillStyle = "black";
    const scale = canvasSize / (data.length + 2);

    for (let y = 0; y < data.length; ++y) {
      for (let x = 0; x < data.length; ++x) {
        if (data[x][y]) {
          const thisX = Math.round((x + 1) * scale);
          const nextX = Math.round((x + 2) * scale);
          const thisY = Math.round((y + 1) * scale);
          const nextY = Math.round((y + 2) * scale);
          ctx.fillRect(thisX, thisY, nextX - thisX, nextY - thisY);
        }
      }
    }
  }, [canvasSize, data]);

  return (
    <div
      className="relative"
      style={{
        margin: -125 / data.length,
        width: elementSize,
        height: elementSize,
      }}
    >
      <svg
        width={elementSize}
        height={elementSize}
        viewBox={`-1 -1 ${data.length + 2} ${data.length + 2}`}
        className="absolute"
      >
        <rect
          fill="white"
          x={-1}
          y={-1}
          width={data.length + 2}
          height={data.length + 2}
        />
        <QrComponent rows={data} />
      </svg>
      <canvas
        width={canvasSize}
        height={canvasSize}
        ref={ref}
        style={{
          transform: `scale(${1 / ratio})`,
          transformOrigin: "top left",
        }}
      />
    </div>
  );
}

function QrComponent({ rows }: { rows: (0 | 1)[][] }) {
  return <>{rows.map(renderRow)}</>;

  function renderRow(cells: (0 | 1)[], i: number) {
    return (
      <React.Fragment key={i}>
        {cells.map((v, j) => renderCell(v, i, j))}
      </React.Fragment>
    );
  }

  function renderCell(v: 0 | 1, i: number, j: number) {
    return (
      <rect
        x={i - 0.01}
        y={j - 0.01}
        width={1.02}
        height={1.02}
        key={i + j * rows.length}
        fill={v ? "currentColor" : "transparent"}
      />
    );
  }
}
