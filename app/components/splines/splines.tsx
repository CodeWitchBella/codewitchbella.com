import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSearchParams } from "@remix-run/react";
import { cubicHermiteSpline } from "./cubic-hermite-spline";
export { default as styles } from "./splines.css";

export function Splines() {
  const ref = useRef<HTMLCanvasElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { onFieldChange, params, setParams } = useUrlConnectedForm(formRef, [
    "invent",
  ]);
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    let tim: ReturnType<typeof setTimeout> | undefined;
    const resize = () => {
      if (tim) clearTimeout(tim);
      tim = setTimeout(() => {
        tim = undefined;
        const width = canvas.clientWidth * window.devicePixelRatio;
        const height = canvas.clientHeight * window.devicePixelRatio;
        setSize((p) =>
          p.width !== width || p.height !== height ? { width, height } : p,
        );
      }, 10);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  const points = params
    .getAll("p")
    .map((v) =>
      v.split("~").map((n) => Number.parseFloat(n) / 1000),
    ) as any as readonly (readonly [x: number, y: number])[];
  const setPoints = (points: readonly (readonly [x: number, y: number])[]) => {
    const newParams = new URLSearchParams(params);
    newParams.delete("p");
    for (const p of points)
      newParams.append("p", p.map((v) => Math.round(v * 1000)).join("~"));
    if (newParams.toString() !== params.toString()) {
      setParams(newParams);
    }
  };

  const tension = Number.parseFloat(params.get("tension") ?? "0");
  const bias = Number.parseFloat(params.get("bias") ?? "0");
  const continuity = Number.parseFloat(params.get("continuity") ?? "0");
  const action = params.get("action") ?? "add";
  const inventPoints = params.get("invent") !== "off";

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const handle = requestAnimationFrame(() => {
      paint(canvas, {
        width,
        height,
        points,
        tension,
        bias,
        continuity,
        inventPoints,
      });
    });
    return () => cancelAnimationFrame(handle);
  }, [height, points, width, tension, bias, continuity, inventPoints]);

  const selectedPoint = useRef(new Map<number, number>());

  return (
    <>
      <canvas
        ref={ref}
        style={{ alignSelf: "stretch", flexGrow: 1, maxHeight: "100vh" }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          const point = getPoint(event);
          if (action === "add") {
            setPoints(points.concat([point]));
            selectedPoint.current.set(event.pointerId, points.length);
            return;
          }

          let minDistanceSq = Number.POSITIVE_INFINITY;
          let minIdx = -1;
          for (let idx = 0; idx < points.length; ++idx) {
            const p = points[idx];
            const vecx = p[0] - point[0];
            const vecy = p[1] - point[1];
            const distanceSq = vecx * vecx + vecy * vecy;
            if (distanceSq < minDistanceSq) {
              minDistanceSq = distanceSq;
              minIdx = idx;
            }
          }
          if (minIdx >= 0) {
            selectedPoint.current.set(event.pointerId, minIdx);
          }
          if (action === "move") {
            setPoints(
              points.map((originalItem, i) =>
                i === minIdx ? point : originalItem,
              ),
            );
          }
        }}
        onPointerMove={(event) => {
          if (!event.buttons) return;
          const point = getPoint(event);
          if (action === "add" || action === "move") {
            const idx = selectedPoint.current.get(event.pointerId) ?? -1;
            setPoints(
              points.map((originalItem, i) =>
                i === idx ? point : originalItem,
              ),
            );
          }
        }}
        onPointerUp={(event) => {
          event.currentTarget.releasePointerCapture(event.pointerId);
          const point = getPoint(event);
          const idx = selectedPoint.current.get(event.pointerId) ?? -1;
          if (action === "add" || action === "move") {
            setPoints(
              points.map((originalItem, i) =>
                i === idx ? point : originalItem,
              ),
            );
          } else if (action === "remove") {
            setPoints(points.slice(0, idx).concat(points.slice(idx + 1)));
          }
        }}
      />
      <form
        ref={formRef}
        style={{
          position: "fixed",
          top: 8,
          left: 8,
          borderRadius: 8,
          background: "lightgray",
          padding: 8,
        }}
      >
        <div>
          <span style={{ fontWeight: "bold", fontSize: "1.5em" }}>
            Kochanek–Bartels spline
          </span>
        </div>
        <div style={{ paddingBottom: 8 }}>
          <a
            href="https://en.wikipedia.org/wiki/Kochanek%E2%80%93Bartels_spline"
            target="_blank"
            rel="noreferrer"
          >
            Wikipedia
          </a>
        </div>

        <label>
          <input
            type="radio"
            name="action"
            value="add"
            checked={action === "add"}
            onChange={onFieldChange}
          />
          Add point
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="remove"
            checked={action === "remove"}
            onChange={onFieldChange}
          />
          Remove point
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="move"
            checked={action === "move"}
            onChange={onFieldChange}
          />
          Move point
        </label>
        <div style={{ display: "flex", paddingTop: 8, gap: 8 }}>
          <div>
            <div>
              <label htmlFor="tension">Tension {tension}</label>{" "}
              <ResetButton name="tension" />
            </div>
            <input
              id="tension"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              name="tension"
              value={tension}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <div>
              <label htmlFor="bias">Bias {bias}</label>{" "}
              <ResetButton name="bias" />
            </div>
            <input
              id="bias"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              name="bias"
              value={bias}
              onChange={onFieldChange}
            />
          </div>
          <div>
            <div>
              <label htmlFor="continuity">Continuity {continuity}</label>{" "}
              <ResetButton name="continuity" />
            </div>
            <input
              id="continuity"
              type="range"
              min="-1"
              max="1"
              step="0.01"
              name="continuity"
              value={continuity}
              onChange={onFieldChange}
            />
          </div>
        </div>
        <label>
          <input
            type="checkbox"
            name="invent"
            checked={inventPoints}
            onChange={onFieldChange}
          />
          Invent points
        </label>
      </form>
    </>
  );
}

function ResetButton({ name }: { name: string }) {
  return (
    <button
      type="button"
      onClick={(event) => {
        const el: HTMLInputElement = event.currentTarget.form?.elements[
          name as any
        ] as any;
        Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        )!.set!.call(el, "0");
        el.dispatchEvent(new Event("input", { bubbles: true }));
      }}
    >
      X
    </button>
  );
}

function useUrlConnectedForm(
  formRef: React.RefObject<HTMLFormElement>,
  checkboxes: readonly string[] = [],
) {
  const [trueParams, setTrueParams] = useSearchParams();
  const [params, setParams] = useReducer(
    (state: URLSearchParams, action: URLSearchParams) =>
      state.toString() !== action.toString() ? action : state,
    trueParams,
  );
  useEffect(() => {
    setParams(trueParams);
  }, [trueParams]);
  const updateTrueParamsRef = useRef<ReturnType<typeof setTimeout>>();
  const onFieldChange = () => {
    const form = formRef.current;
    if (!form) return null;
    const data = new FormData(form);
    const newParams = new URLSearchParams(params);
    for (const checkbox of checkboxes) newParams.set(checkbox, "off");
    for (const [key, value] of data.entries()) {
      if (typeof value === "string") {
        newParams.set(key, value);
      }
    }
    setParams(newParams);
  };
  useEffect(() => {
    if (trueParams.toString() === params.toString()) return;
    const tim = setTimeout(() => {
      updateTrueParamsRef.current = undefined;
      if (trueParams.toString() !== params.toString()) setTrueParams(params);
    }, 1000);
    return () => clearTimeout(tim);
  }, [params, setTrueParams, trueParams]);
  return { onFieldChange, params, setParams };
}

function getPoint(event: React.PointerEvent<HTMLCanvasElement>) {
  return [
    (event.clientX - event.currentTarget.clientLeft) /
      event.currentTarget.clientWidth,
    (event.clientY - event.currentTarget.clientTop) /
      event.currentTarget.clientHeight,
  ] as const;
}

function paint(
  canvas: HTMLCanvasElement,
  {
    width,
    height,
    points,
    tension,
    bias,
    continuity,
    inventPoints,
  }: {
    width: number;
    height: number;
    points: readonly (readonly [number, number])[];
    tension: number;
    bias: number;
    continuity: number;
    inventPoints: boolean;
  },
) {
  if (canvas.width !== width) canvas.width = width;
  if (canvas.height !== height) canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.resetTransform();

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  ctx.fillStyle = "black";
  const mapPoint = (v: readonly [number, number]) =>
    [v[0] * canvas.clientWidth, v[1] * canvas.clientHeight] as const;
  for (const pt of points) {
    ctx.beginPath();
    ctx.ellipse(...mapPoint(pt), 5, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const dik1 = ((1 - tension) * (1 + bias) * (1 + continuity)) / 2;
  const dik2 = ((1 - tension) * (1 - bias) * (1 - continuity)) / 2;
  const dik3 = ((1 - tension) * (1 + bias) * (1 - continuity)) / 2;
  const dik4 = ((1 - tension) * (1 - bias) * (1 + continuity)) / 2;

  for (let i = 0; i < points.length - 1; ++i) {
    const pi = points[i];
    const pip1 = points[i + 1];
    let pim1 = points[i - 1];
    let pip2 = points[i + 2];

    if (inventPoints) {
      if (!pip2) {
        if (!pim1) {
          pip2 = pip1;
          pim1 = pi;
        } else {
          pip2 = [
            pip1[0] - pi[0] + pim1[0],
            pip1[1] - pi[1] + pim1[1],
          ] as const;
        }
      } else if (!pim1) {
        pim1 = [pi[0] - pip1[0] + pip2[0], pi[1] - pip1[1] + pip2[1]] as const;
      }
    } else if (!pim1 || !pip2) {
      continue;
    }

    const di = [
      dik1 * (pi[0] - pim1[0]) + dik2 * (pip1[0] - pi[0]),
      dik1 * (pi[1] - pim1[1]) + dik2 * (pip1[1] - pi[1]),
    ] as const;
    const dip1 = [
      dik3 * (pip1[0] - pi[0]) + dik4 * (pip2[0] - pip1[0]),
      dik3 * (pip1[1] - pi[1]) + dik4 * (pip2[1] - pip1[1]),
    ] as const;
    for (let t = 0; t <= 1; t += 0.01) {
      const v = cubicHermiteSpline(t, {
        point0: pi,
        point1: pip1,
        tangent0: di,
        tangent1: dip1,
      });
      ctx.fillRect(...mapPoint(v), 2, 2);
    }
  }
}
