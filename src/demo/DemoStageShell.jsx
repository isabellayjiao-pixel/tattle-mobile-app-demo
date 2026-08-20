import { useEffect, useRef, useState } from "react";

export default function DemoStageShell({ children }) {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [stageSize, setStageSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const viewport = viewportRef.current;
    const stage = stageRef.current;
    if (!viewport || !stage) return undefined;

    const update = () => {
      const styles = getComputedStyle(viewport);
      const padX = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      const padY = parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom);
      const availW = Math.max(0, viewport.clientWidth - padX);
      const availH = Math.max(0, viewport.clientHeight - padY);
      const w = stage.offsetWidth;
      const h = stage.offsetHeight;
      if (!w || !h || !availW || !availH) return;

      const nextScale = Math.min(1, availW / w, availH / h);
      setScale(nextScale);
      setStageSize({ w, h });
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(stage);
    window.addEventListener("resize", update);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <main ref={viewportRef} className="desktop-stage demo-layout demo-enter">
      <div
        className="demo-scale-wrap"
        style={
          stageSize.w && stageSize.h
            ? { width: `${stageSize.w * scale}px`, height: `${stageSize.h * scale}px` }
            : undefined
        }
      >
        <div
          ref={stageRef}
          className="demo-stage-stack"
          style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {children}
        </div>
      </div>
    </main>
  );
}
