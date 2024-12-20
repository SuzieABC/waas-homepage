"use client";

import { useEffect, useRef, useState } from "react";
import {
  Engine,
  Render,
  World,
  Bodies,
  Runner,
  Mouse,
  MouseConstraint,
} from "matter-js";
import useWindowWidth from "@/utils/localization/hooks/useWindowWidth";

import aptos from "@/assets/images/supportedNetworks/aptos_image.png";
import arbitrum from "@/assets/images/supportedNetworks/arbitrum_image.png";
import avalanche from "@/assets/images/supportedNetworks/avalanche_image.png";
import bitcoin from "@/assets/images/supportedNetworks/bitcoin_image.png";
import bsc from "@/assets/images/supportedNetworks/bsc_image.png";
import ethereum from "@/assets/images/supportedNetworks/ethereum_image.png";
import fncy from "@/assets/images/supportedNetworks/fncy_image.png";
import kaia from "@/assets/images/supportedNetworks/kaia_image.png";
import mantle from "@/assets/images/supportedNetworks/mantle_image.png";
import oasys from "@/assets/images/supportedNetworks/oasys_image.png";
import polygon from "@/assets/images/supportedNetworks/polygon_image.png";
import taiko from "@/assets/images/supportedNetworks/taiko_image.png";
import wemix from "@/assets/images/supportedNetworks/wemix_image.png";
import xlayer from "@/assets/images/supportedNetworks/x_layer_image.png";

const icons = [
  aptos,
  arbitrum,
  avalanche,
  bitcoin,
  bsc,
  ethereum,
  fncy,
  kaia,
  mantle,
  oasys,
  polygon,
  taiko,
  wemix,
  xlayer,
];

interface ExtendedMouse extends Mouse {
  element: HTMLElement;
  mousewheel: (e: Event) => void;
  mousemove: (e: Event) => void;
  mousedown: (e: Event) => void;
  mouseup: (e: Event) => void;
}

export default function SupportedNetworks(): JSX.Element {
  const { windowWidth, isMobile, isTablet, isDesktop } = useWindowWidth();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Intersection Observer로 화면에 들어올 때만 실행
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const wallThickness = 50;
    const initialHeight = isMobile ? 600 : isTablet ? 500 : 620;
    const initialIconSize = isMobile || isTablet ? 35 : 75;

    const engine = Engine.create();
    const dynamicPadding = isMobile || isTablet ? 20 : 40; // 패딩 동적 적용
    const width = Math.min(
      window.innerWidth - dynamicPadding * 2,
      1920 - dynamicPadding * 2
    );
    let render: Render;

    const setupWorld = () => {
      render = Render.create({
        element: containerRef.current as HTMLElement,
        engine: engine,
        options: {
          width,
          height: initialHeight,
          background: "#181821",
          wireframes: false,
          pixelRatio: 2,
        },
      });

      // 벽과 바닥 추가
      const floor = Bodies.rectangle(
        width / 2,
        initialHeight,
        width,
        wallThickness,
        {
          isStatic: true,
          render: { visible: false },
        }
      );

      const ceiling = Bodies.rectangle(width / 2, 0, width, wallThickness, {
        isStatic: true,
        render: { visible: false },
      });

      const leftWall = Bodies.rectangle(
        0,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      const rightWall = Bodies.rectangle(
        width,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );

      // 아이콘 추가
      const iconBodies = icons.map((icon) =>
        Bodies.circle(Math.random() * width, 50, initialIconSize, {
          restitution: 0.5,
          // friction: 0.1,
          // frictionAir: 0.02, // 공기저항
          render: {
            sprite: {
              texture: icon.src,
              xScale: isMobile || isTablet ? 0.15 : 0.33,
              yScale: isMobile || isTablet ? 0.15 : 0.33,
            },
          },
        })
      );

      World.add(engine.world, [
        floor,
        ceiling,
        leftWall,
        rightWall,
        ...iconBodies,
      ]);

      // 마우스 드래그 추가
      const mouse = Mouse.create(render.canvas) as ExtendedMouse;

      // 터치 스크롤을 허용하기 위해 Matter.js의 touch 이벤트 제거
      mouse.element.removeEventListener("touchmove", mouse.mousemove);
      mouse.element.removeEventListener("touchstart", mouse.mousedown);
      mouse.element.removeEventListener("touchend", mouse.mouseup);
      mouse.element.removeEventListener("wheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });

      // Matter.js가 추가하는 wheel 이벤트 제거 (스크롤 허용)
      mouse.element.removeEventListener("wheel", mouse.mousewheel);
      mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);

      // CSS touch-action 설정으로 터치 이벤트 허용
      render.canvas.style.touchAction = "auto";

      World.add(engine.world, mouseConstraint);

      // 실행
      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);
    };

    setupWorld();

    return () => {
      // 리소스 정리
      if (render) {
        Render.stop(render);
        Engine.clear(engine);
        World.clear(engine.world, true);
        render.canvas.remove();
      }
    };
  }, [isVisible, isMobile, isTablet, windowWidth]);

  return (
    <div
      className={`${
        isMobile
          ? "px-[20px] pt-[80px]"
          : isTablet
          ? "px-[20px] pt-[100px]"
          : isDesktop
          ? "px-[40px] pt-[120px]"
          : "px-[40px] pt-[240px]"
      }`}
      style={{ visibility: windowWidth ? "visible" : "hidden" }}
    >
      <h1
        className={`${
          isMobile
            ? "text-[28px] mb-[40px] tracking-[-1.02px]"
            : isTablet
            ? "text-[32px] text-center mb-[58px]"
            : "text-[60px] mb-[80px] tracking-[-0.6px]"
        }`}
      >
        Supported Networks
      </h1>
      <div
        ref={containerRef}
        style={{
          width: "100%",
          height: isMobile || isTablet ? "600px" : "620px",
          borderRadius: "20px",
          overflow: "hidden",
          position: "relative",
        }}
      ></div>
    </div>
  );
}
