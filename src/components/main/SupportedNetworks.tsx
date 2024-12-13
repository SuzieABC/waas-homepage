"use client";

import { useEffect, useRef, useState } from "react";
import { Engine, Render, World, Bodies, Runner, Body } from "matter-js";

import aptos from "@/assets/images/SupportedNetworks/aptos_image.png";
import arbitrum from "@/assets/images/SupportedNetworks/arbitrum_image.png";
import avalanche from "@/assets/images/SupportedNetworks/avalanche_image.png";
import bitcoin from "@/assets/images/SupportedNetworks/bitcoin_image.png";
import bsc from "@/assets/images/SupportedNetworks/bsc_image.png";
import ethereum from "@/assets/images/SupportedNetworks/ethereum_image.png";
import fncy from "@/assets/images/SupportedNetworks/fncy_image.png";
import kaia from "@/assets/images/SupportedNetworks/kaia_image.png";
import mantle from "@/assets/images/SupportedNetworks/mantle_image.png";
import oasys from "@/assets/images/SupportedNetworks/oasys_image.png";
import polygon from "@/assets/images/SupportedNetworks/polygon_image.png";
import taiko from "@/assets/images/SupportedNetworks/taiko_image.png";
import wemix from "@/assets/images/SupportedNetworks/wemix_image.png";
import xlayer from "@/assets/images/SupportedNetworks/x_layer_image.png";

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

export default function SupportedNetworks(): JSX.Element {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true); // 화면에 보이면 초기화
        }
      },
      { threshold: 0.1 } // 10%가 보이면 트리거
    );

    const currentRef = containerRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const wallThickness = 20;
    const initialHeight = 640;
    const initialIconSize = 75;
    const engine = Engine.create();
    let render: Render | null = null;
    let iconBodies: Body[] = [];

    const initializeWorld = () => {
      const width = Math.min(window.innerWidth - 80, 1840);

      render = Render.create({
        element: containerRef.current as HTMLElement,
        engine: engine,
        options: {
          width,
          height: initialHeight,
          background: "#181821",
          wireframes: false,
          pixelRatio: 1,
        },
      });

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
      const leftWall = Bodies.rectangle(
        wallThickness / 2,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      const rightWall = Bodies.rectangle(
        width - wallThickness / 2,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );

      iconBodies = icons.map((icon) => {
        const x = Math.random() * width;
        const y = Math.random() * -200;

        return Bodies.circle(x, y, initialIconSize, {
          restitution: 1,
          render: {
            sprite: {
              texture: icon.src,
              xScale: 0.3,
              yScale: 0.3,
            },
          },
        });
      });

      World.add(engine.world, [floor, leftWall, rightWall, ...iconBodies]);

      Render.run(render);
      const runner = Runner.create();
      Runner.run(runner, engine);
    };

    const resizeHandler = () => {
      const newWidth = Math.min(window.innerWidth - 80, 1840);

      World.clear(engine.world, false);
      iconBodies = icons.map((icon) => {
        const x = Math.random() * newWidth;
        const y = Math.random() * -200;

        return Bodies.circle(x, y, initialIconSize, {
          restitution: 1,
          render: {
            sprite: {
              texture: icon.src,
              xScale: 0.3,
              yScale: 0.3,
            },
          },
        });
      });

      const floor = Bodies.rectangle(
        newWidth / 2,
        initialHeight,
        newWidth,
        wallThickness,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      const leftWall = Bodies.rectangle(
        wallThickness / 2,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );
      const rightWall = Bodies.rectangle(
        newWidth - wallThickness / 2,
        initialHeight / 2,
        wallThickness,
        initialHeight,
        {
          isStatic: true,
          render: { visible: false },
        }
      );

      World.add(engine.world, [floor, leftWall, rightWall, ...iconBodies]);

      if (render) {
        render.canvas.width = newWidth;
        render.canvas.height = initialHeight;
        render.options.width = newWidth;
        render.options.height = initialHeight;
      }
    };

    initializeWorld();
    window.addEventListener("resize", resizeHandler);

    return () => {
      if (render) {
        Render.stop(render);
        Engine.clear(engine);
        World.clear(engine.world, true);
        render.canvas.remove();
        render.textures = {};
      }
      window.removeEventListener("resize", resizeHandler);
    };
  }, [isVisible]);

  return (
    <div className="px-[40px]">
      <h1 className="text-[60px]">Supported Networks</h1>
      <div
        ref={containerRef}
        style={{
          maxWidth: "1920px",
          margin: "80px 0px 240px",
          overflow: "hidden",
          position: "relative",
          borderRadius: "40px",
        }}
      ></div>
    </div>
  );
}
