/**
 * UI Initiative Super Flow - Ultra Optimized Version
 * * Versión final:
 * 1. Caché de DOM (WeakMap) para velocidad máxima.
 * 2. Aceleración por GPU (translate3d).
 * 3. Efecto de fragmentos y bordes (espejo) corregido.
 */

import { effectInit, effectVirtualTransitionEnd } from "swiper/effect-utils";
import type { Swiper } from "swiper/types";

// Extender Window para incluir SwiperElementRegisterParams
declare global {
  interface Window {
    SwiperElementRegisterParams?: (params: string[]) => void;
  }
}

const LEVEL_INDEXES = {
  level1: [0, 1, 6, 7],
  level2: [2, 3, 8, 9],
  level3: [4, 5, 10, 11],
} as const;

interface SuperFlowEffectParams {
  fragments: number;
  fragmentBorderWidth: number;
  fragmentBlur: boolean;
  contentOffset: number;
  contentScale: number;
  scaleDuration: number;
  mainImageScale: number;
  level1Scale: number;
  level2Scale: number;
  level3Scale: number;
}

interface SlideElements {
  content: HTMLElement | null;
  image: HTMLElement | null;
  fragments: HTMLElement | null;
  l1: HTMLElement[];
  l2: HTMLElement[];
  l3: HTMLElement[];
  all: Element[];
}

export default function EffectSuperFlow(options: any): void {
  const { swiper, on, extendParams } = options as {
    swiper: Swiper & { size: number };
    on: (event: string, callback: () => void) => void;
    extendParams: (params: { superFlowEffect: SuperFlowEffectParams }) => void;
  };
  // Caché para evitar consultas repetitivas al DOM en cada frame
  const domCache = new WeakMap<HTMLElement, SlideElements>();

  extendParams({
    superFlowEffect: {
      fragments: 3,
      fragmentBorderWidth: 1,
      fragmentBlur: false,
      contentOffset: 5,
      contentScale: 1.2,
      scaleDuration: 10000,
      mainImageScale: 1.1,
      level1Scale: 1.15,
      level2Scale: 1.2,
      level3Scale: 1.25,
    },
  });

  let animationInSlideIndex: number | null = null;
  let justTouched = false;

  // --- Helpers de Rendimiento ---

  const getElements = (slideEl: HTMLElement): SlideElements => {
    const cached = domCache.get(slideEl);
    if (cached) {
      return cached;
    }

    const fragmentsContainer = slideEl.querySelector(
      ".super-flow-fragments",
    ) as HTMLElement | null;
    const children = fragmentsContainer
      ? [...fragmentsContainer.children]
      : [];

    const data: SlideElements = {
      content: slideEl.querySelector(".super-flow-content") as HTMLElement | null,
      image: slideEl.querySelector(".super-flow-image") as HTMLElement | null,
      fragments: fragmentsContainer,
      l1: LEVEL_INDEXES.level1
        .map((i) => children[i] as HTMLElement | undefined)
        .filter((el): el is HTMLElement => Boolean(el)),
      l2: LEVEL_INDEXES.level2
        .map((i) => children[i] as HTMLElement | undefined)
        .filter((el): el is HTMLElement => Boolean(el)),
      l3: LEVEL_INDEXES.level3
        .map((i) => children[i] as HTMLElement | undefined)
        .filter((el): el is HTMLElement => Boolean(el)),
      all: children,
    };

    domCache.set(slideEl, data);
    return data;
  };

  const getSlideIndex = (el: HTMLElement): number => {
    const virtualParams = swiper.params.virtual;
    const isVirtual = typeof virtualParams === "object" && virtualParams !== null && "enabled" in virtualParams && virtualParams.enabled;
    return swiper.params.loop || isVirtual
      ? Number.parseInt(el.getAttribute("data-swiper-slide-index") || "0", 10)
      : swiper.slides.indexOf(el);
  };

  const getTransform = (v: number | string = 0): string => {
    const unit = typeof v === "string" ? v : `${v}%`;
    return swiper.isHorizontal()
      ? `translate3d(${unit}, 0, 0)`
      : `translate3d(0, ${unit}, 0)`;
  };

  // --- Lógica Visual (Clip Paths) ---

  const generateClipPathData = (
    side: "left" | "right",
    level: number,
    bW: number,
    sidePercents: number[][],
  ): { borderClipPath: string; imageClipPath: string } => {
    let t: number;
    let b: number;
    if (level === 0) {
      t =
        side === "left"
          ? 20 + Math.random() * 5
          : 5 + Math.random() * 5;
      b =
        side === "left"
          ? 5 + Math.random() * 5
          : 20 + Math.random() * 10;
      sidePercents.push([t, b]);
    } else {
      const base = sidePercents[0];
      if (!base || base[0] === undefined || base[1] === undefined) {
        t = side === "left" ? 20 : 5;
        b = side === "left" ? 5 : 20;
      } else {
        const baseT = base[0];
        const baseB = base[1];
        t =
          level === 1
            ? side === "left"
              ? 5 + Math.random() * 5
              : 10 + Math.random() * 10
            : baseT -
            Math.random() * (side === "left" ? 10 : 5);
        b =
          level === 1
            ? side === "left"
              ? 10 + Math.random() * 10
              : 5 + Math.random() * 5
            : baseB -
            Math.random() * (side === "left" ? 5 : 10);
      }
    }

    const rawPoints =
      side === "left"
        ? [
          [0, 0],
          [t, 0],
          [b, 100],
          [0, 100],
        ]
        : [
          [100, 0],
          [100 - t, 0],
          [100 - b, 100],
          [100, 100],
        ];

    const imageClipPath = `polygon(${rawPoints.map((p) => `${p[0]}% ${p[1]}%`).join(",")})`;
    const op = side === "left" ? "+" : "-";
    const borderClipPath = `polygon(${rawPoints.map((p) => `calc(${p[0]}% ${op} ${bW}px) ${p[1]}%`).join(",")})`;

    return { borderClipPath, imageClipPath };
  };

  // --- Métodos de Swiper ---

  const createFragments = (s: Swiper): void => {
    const {
      fragmentBorderWidth: bW,
      fragmentBlur: blur,
      fragments: count,
    } = (s.params as any).superFlowEffect as SuperFlowEffectParams;
    const isH = swiper.isHorizontal();
    const rtl = swiper.rtlTranslate;

    s.el.querySelectorAll(".super-flow-image").forEach((el) => {
      const imageEl = el as HTMLElement;
      const mainImg = imageEl.querySelector(
        "img:not(.super-flow-fragment)",
      ) as HTMLImageElement | null;
      if (!mainImg) return;

      const fragmentsToRemove = imageEl.querySelectorAll(
        ".super-flow-fragment, .super-flow-fragment-border",
      );
      for (const f of fragmentsToRemove) {
        f.remove();
      }

      const isTop = Math.random() > 0.5;
      const off = (5 + Math.random() * 4) / 2;
      const p = isH
        ? rtl
          ? [
            [isTop ? off : 0, 0],
            [100, 0],
            [100, 100],
            [!isTop ? off : 0, 100],
          ]
          : [
            [0, 0],
            [isTop ? 100 - off : 100, 0],
            [!isTop ? 100 - off : 100, 100],
            [0, 100],
          ]
        : [
          [0, 0],
          [100, 0],
          [100, isTop ? 100 - off : 100],
          [0, !isTop ? 100 - off : 100],
        ];

      imageEl.style.clipPath = `polygon(${p.map((pts) => pts.map((v) => `${v}%`).join(" ")).join(",")})`;

      const fragContainer = document.createElement("div");
      fragContainer.className = "super-flow-fragments";
      imageEl.appendChild(fragContainer);

      (["left", "right"] as const).forEach((side) => {
        const sidePercents: number[][] = [];
        for (let i = 0; i < Math.min(count, 3); i++) {
          const { borderClipPath, imageClipPath } =
            generateClipPathData(side, i, bW, sidePercents);
          const imgClone = mainImg.cloneNode(true) as HTMLImageElement;
          const border = document.createElement("div");
          imgClone.className = "super-flow-fragment";
          border.className = "super-flow-fragment-border";
          imgClone.style.clipPath = imageClipPath;
          border.style.clipPath = borderClipPath;
          if (blur) imgClone.style.filter = `blur(${i + 1}px)`;
          fragContainer.append(border, imgClone);
        }
      });
    });
  };

  const setTranslate = (): void => {
    const { slides, rtlTranslate: rtl, translate, params } = swiper;
    const size = (swiper as any).size as number;
    const { contentOffset: cfgOffset } = (params as any).superFlowEffect as SuperFlowEffectParams;
    const rtlMult = rtl ? -1 : 1;

    for (let i = 0; i < slides.length; i++) {
      const slideEl = slides[i] as HTMLElement;
      const progress = (slideEl as unknown as { progress: number }).progress;
      const absProgress = Math.min(1, Math.abs(progress));
      const el = getElements(slideEl);

      let offset: number;
      let imgScale = 1.1;
      let imgOff = 0;
      let fragScale = 0.95;
      let fragOff = 5 * absProgress;
      let contOff = 0;
      let l1 = 0;
      let l2 = 0;
      let l3 = 0;

      if (progress <= 0) {
        contOff = -cfgOffset * rtlMult;
        offset = size * progress + translate * rtlMult;
        imgScale = 1.1 - 0.1 * absProgress;
        imgOff = 20 * rtlMult * absProgress;
        fragScale = 0.95 + 0.05 * absProgress;
        fragOff = 0;
        l1 = 30 * rtlMult * absProgress;
        l2 = 20 * rtlMult * absProgress;
        l3 = 10 * rtlMult * absProgress;
      } else {
        offset =
          (translate - Math.min(progress, 1) * size * 0.09 * rtlMult) *
          rtlMult;
      }

      if (rtl) offset = -offset;

      slideEl.style.transform = getTransform(`${offset}px`);
      slideEl.style.zIndex = String(slides.length - i);

      if (el.image)
        el.image.style.transform = `scale(${imgScale}) ${getTransform(imgOff)}`;
      if (el.fragments)
        el.fragments.style.transform = `scale(${fragScale}) ${getTransform(fragOff)}`;

      if (getSlideIndex(slideEl) !== animationInSlideIndex) {
        if (el.content)
          el.content.style.transform = getTransform(contOff);
        for (const f of el.l1) {
          f.style.transform = getTransform(l1);
        }
        for (const f of el.l2) {
          f.style.transform = getTransform(l2);
        }
        for (const f of el.l3) {
          f.style.transform = getTransform(l3);
        }
      }
    }
  };

  const setTransition = (duration: number): void => {
    swiper.slides.forEach((slideEl) => {
      const slide = slideEl as HTMLElement;
      const isAnimating = getSlideIndex(slide) === animationInSlideIndex;
      const selector = `.super-flow-fragments, .super-flow-image${!isAnimating ? ", .super-flow-image img, .super-flow-fragment, .super-flow-fragment-border, .super-flow-content" : ""}`;

      [slide, ...slide.querySelectorAll(selector)].forEach((el) => {
        (el as HTMLElement).style.transitionDuration = `${duration}ms`;
      });
    });
    effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements: swiper.slides,
      allSlides: true,
    });
  };

  const animate = (): void => {
    const activeIndex = swiper.params.loop
      ? swiper.realIndex
      : swiper.activeIndex;
    const virtualParams = swiper.params.virtual;
    const isVirtual = typeof virtualParams === "object" && virtualParams !== null && "enabled" in virtualParams && virtualParams.enabled;
    const slideEl = isVirtual
      ? (swiper.slides.find(
        (el) =>
          el.getAttribute("data-swiper-slide-index") ===
          activeIndex.toString(),
      ) as HTMLElement | undefined)
      : (swiper.slides[swiper.activeIndex] as HTMLElement | undefined);

    if (!slideEl || getSlideIndex(slideEl) === animationInSlideIndex) return;
    animationInSlideIndex = getSlideIndex(slideEl);

    const {
      scaleDuration: dur,
      mainImageScale: mS,
      level1Scale: l1S,
      level2Scale: l2S,
      level3Scale: l3S,
      contentOffset: cO,
      contentScale: cS,
    } = (swiper.params as any).superFlowEffect as SuperFlowEffectParams;
    const rtlMult = swiper.rtlTranslate ? -1 : 1;
    const el = getElements(slideEl);

    const applyAnim = (target: HTMLElement | null, transform: string): void => {
      if (!target) return;
      target.style.transitionDuration = `${dur}ms`;
      target.style.transitionTimingFunction = "linear";
      target.style.transform = transform;
    };

    const imageImg = el.image?.querySelector("img") as HTMLElement | null;
    [imageImg, el.content, ...el.all].forEach((i) => {
      if (i) (i as HTMLElement).style.transitionDuration = "0ms";
    });
    if (el.content)
      el.content.style.transform = getTransform(-cO * rtlMult);

    // eslint-disable-next-line no-unused-expressions
    slideEl.clientLeft;

    applyAnim(imageImg, `${getTransform()} scale(${mS})`);
    applyAnim(
      el.content,
      `${getTransform(cO * rtlMult)} scale(${cS})`,
    );
    for (const f of el.l1) {
      applyAnim(f, `${getTransform()} scale(${l1S})`);
    }
    for (const f of el.l2) {
      applyAnim(f, `${getTransform()} scale(${l2S})`);
    }
    for (const f of el.l3) {
      applyAnim(f, `${getTransform()} scale(${l3S})`);
    }
  };

  // --- Eventos ---
  on("beforeInit", () => createFragments(swiper));
  on("init", () => {
    if (swiper.params.initialSlide === 0) animate();
  });
  on("touchEnd", () => {
    justTouched = true;
    requestAnimationFrame(() => {
      justTouched = false;
    });
  });
  on("transitionStart", () => {
    if (!justTouched) animate();
  });
  on("transitionEnd", () => {
    swiper.slides.forEach((slide) => {
      const slideEl = slide as HTMLElement;
      if (
        getSlideIndex(slideEl) !==
        (swiper.params.loop ? swiper.realIndex : swiper.activeIndex)
      ) {
        const elements = slideEl.querySelectorAll(
          "img, .super-flow-fragment, .super-flow-fragment-border",
        );
        for (const i of elements) {
          (i as HTMLElement).style.transitionDuration = "0ms";
          (i as HTMLElement).style.transform = "";
        }
      }
    });
    animate();
  });
  on("virtualUpdate", setTranslate);

  effectInit({
    effect: "super-flow",
    swiper,
    on: on as any,
    setTranslate,
    setTransition,
    perspective: () => false,
    overwriteParams: () => ({
      virtualTranslate: true,
      centeredSlides: false,
      slidesPerGroup: 1,
      slidesPerView: 1,
      watchSlidesProgress: true,
      spaceBetween: 0,
    }),
  });
}

if (typeof window !== "undefined" && window.SwiperElementRegisterParams) {
  window.SwiperElementRegisterParams(["superFlowEffect"]);
}

