import dynamic from "next/dynamic";
import type { NextPage } from "next";
import placeholder from "../../assets/images/placeholder.png";
import { useDrag } from "@use-gesture/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Draggable from "../../components/dnd/Draggable";
import clsx from "clsx";
import DropZone from "../../components/dnd/DropZone";
import Block from "../../components/studio/Block";
import Slot from "../../components/studio/Slot";
import price from "../../assets/images/price.png";
import html2canvas from "html2canvas";
import { useSpring, animated, config } from "@react-spring/web";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  aspectRatioState,
  blocksState,
  layouts,
  pagesState,
  slotsState,
} from "../../state/studio";
import {
  ChangeEvent,
  ChangeEventHandler,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { TBlock, TLayout } from "../../types";
import layout1 from "../../templates/layouts/layouts1";
interface PriceProps {
  price: number;
  unit: string;
  top: string;
}
const Price: React.FC<PriceProps> = ({ price, unit, top }) => {
  return (
    <div className="relative  mt-8 ">
      <div className="bg-yellow-400 absolute -top-9 left-4 py-2 w-full">
        <h1 className="text-black text-xl font-bold text-center">Superpris!</h1>
      </div>
      <div className=" bg-red-700 px-4 pt-2 z-3">
        <h2 className="text-center">{top}</h2>
        <span>
          <span className="text-6xl font-extrabold ">{price}</span>
          <span className="">{unit}</span>
        </span>
      </div>
    </div>
  );
};

interface MainHeadingProps {
  period: string;
  title: string;
  subtitle: string;
}
const MainHeading: React.FC<MainHeadingProps> = ({
  period,
  title,
  subtitle,
}) => {
  return (
    <div className="text-red-500 text-center">
      <h2 className="text-3xl font-semibold">{period}</h2>
      <h1 className="text-7xl font-bold">{title}</h1>
      <h3 className="text-xl">{subtitle}</h3>
    </div>
  );
};
const Template = () => {
  const bind = useDrag(
    ({ xy, offset, currentTarget, target, delta, cancel }) => {
      const { width, height, x, y } = currentTarget.getBoundingClientRect();
      if (
        !inRect(parent.current?.getBoundingClientRect()!, {
          width,
          height,
          x: x + delta[0],
          y: y + delta[1],
        })
      ) {
        setIsOutSide(true);
        cancel();
      } else {
        setIsOutSide(false);
        setIsDragging(true);
        setPos({ x: pos.x + delta[0], y: pos.y + delta[1] });
      }
    }
  );
  const parent = useRef<HTMLDivElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 59, y: 50 });
  const [isOutSide, setIsOutSide] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const style = useSpring({
    x: pos.x,
    y: pos.y,
    backgroundColor: isDragging ? "red" : "green",
    config: {
      duration: 5,
    },
  });

  // const downloadImage = (blob, fileName) => {
  //   const fakeLink = window.document.createElement("a");
  //   fakeLink.style = "display:none;";
  //   fakeLink.download = fileName;

  //   fakeLink.href = blob;

  //   document.body.appendChild(fakeLink);
  //   fakeLink.click();
  //   document.body.removeChild(fakeLink);

  //   fakeLink.remove();
  // };

  // useEffect(() => {
  //   async function getElement() {
  //     let canvas = await html2canvas(parent.current);
  //     let image = canvas.toDataURL("image/png", 1.0);
  //     downloadImage(image, "test.png");

  //     console.log(image);
  //     return canvas;
  //   }
  //   console.log(getElement());
  // }, []);
  return (
    <div className={clsx("h-full", { "bg-red-500": isOutSide })} ref={parent}>
      <animated.div
        ref={divRef}
        onMouseUp={(e) => {
          if (!parent.current) return;
          if (
            !inRect(
              parent.current?.getBoundingClientRect()!,
              e.currentTarget.getBoundingClientRect()
            )
          ) {
            setPos({ x: 0, y: 0 });
            setIsOutSide(false);
          }
          setIsDragging(false);
        }}
        className="bg-black text-white w-3/5 p-4"
        {...bind()}
        style={style}
      >
        hello
      </animated.div>
    </div>
  );
};
const Template2 = () => {
  return (
    <div className={clsx("bg-black flex flex-col h-full gap-4")}>
      <div className="flex-1 ">
        <Slot name="0" />
      </div>
      <div className=" flex-1 grid grid-cols-2 grid-row-2  gap-4">
        <Slot name="0" />
        <Slot name="1" />
        <Slot name="2" />
        <Slot name="3" />
      </div>
    </div>
  );
};

const Template1 = () => {
  return (
    <div className={clsx("bg-black flex h-full")}>
      <div className="grid grid-cols-2 grid-row-2 flex-1 gap-4">
        <Slot name="0" />
        <Slot name="1" />
        <Slot name="2" />
        <Slot name="3" />
      </div>
    </div>
  );
};

const StudioPage: NextPage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <RecoilRoot>
        <Studio />
      </RecoilRoot>
    </DndProvider>
  );
};

const StudioOverlay = () => {
  return (
    <div className="absolute w-full h-full bg-[#969696d9]  z-100 flex items-center justify-center">
      <div className="flex flex-col bg-white  w-3/6 p-8">
        <h1 className="text-2xl font-bold">select overlay</h1>
        <div className="grid grid-cols-2 flex-1 gap-4">
          <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">
            a
          </div>
          <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">
            b
          </div>
          <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">
            c
          </div>
          <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">
            d
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudioPage;

const initialBlocks: [string, { name: string; imageSrc: string }][] = [
  [
    "test00",
    {
      name: "test00",
      imageSrc: price.src,
    },
  ],
];

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
function inRect(boundingRect: Rect, testRect: Rect) {
  console.log("boundingRect", boundingRect.width);
  console.log("testRect", testRect.x);
  return (
    boundingRect.x <= testRect.x &&
    boundingRect.y <= testRect.y &&
    boundingRect.width + boundingRect.x >= testRect.x + testRect.width &&
    boundingRect.height + boundingRect.y >= testRect.y + testRect.height
  );
  // boundingRect.x <= testRect.x && boundingRect.y <= testRect.y
  // boundingRect.x + boundingRect.width <= testRect.x + testRect.width &&
  // boundingRect.y + boundingRect.height <= testRect.y + testRect.height
}

const Studio = () => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  const [pages, setPages] = useRecoilState(pagesState);
  useEffect(() => {
    setBlocks(() => {
      const map = new Map(initialBlocks);
      return map;
    });
  }, []);

  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (canvasRef && canvasRef.current) {
      console.log(canvasRef.current.getBoundingClientRect());
    }
  }, [canvasRef]);
  return (
    <div className="w-screen max-h-screen h-screen bg-blue-50 flex flex-col relative z-0 overflow-auto ">
      {/* <StudioOverlay /> */}
      <Navbar />
      <div
        id="main"
        className="grid grid-cols-5  bg-blue-500 w-full h-full max-h-full overflow-hidden"
      >
        <div
          id="left panel"
          className="bg-white border-r-4 border-gray-200 border-solid   text-black col-span-1"
        >
          <div className="grid grid-cols-2 p-4 gap-4 ">
            {[...blocks.values()].map(({ name, imageSrc }) => {
              return <Block key={name} name={name} imageSrc={imageSrc}></Block>;
            })}
          </div>
        </div>
        <div
          id="canvas"
          className="flex-1 flex flex-col items-center bg-white  max-h-full overflow-y-scroll col-span-3"
        >
          {" "}
          <div className="w-3/6 flex flex-col gap-8 mt-8 flex-1 flex-grow-0">
            {[...pages].map(([id, page], i) => {
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPage(id)}
                  className={clsx(
                    "hover:border-teal-300  border-white border-2",
                    { "border-teal-300": id === selectedPage }
                  )}
                >
                  <p className="text-md font-bold mb-2">{page.name}</p>
                  <div
                    ref={canvasRef}
                    className="aspect-[210/297]  bg-gray-100 flex-shrink-0"
                  >
                    <Template />
                  </div>
                </div>
              );
            })}
            <button
              className="bg-gray-300 font-bold text-xl p-2  rounded-md w-full hover:bg-gray-200"
              onClick={() => {
                setPages((currentPages) => {
                  const name = `Page ${currentPages.size}`;
                  currentPages.set(name, {
                    name,
                    pageNumber: currentPages.size,
                  });
                  return new Map(currentPages);
                });
              }}
            >
              add page
            </button>
          </div>
        </div>

        <RightPanel selectedPage={selectedPage} />
      </div>
    </div>
  );
};

const Navbar = ({}) => {
  const [aspectRatio, setAspectRatio] = useRecoilState(aspectRatioState);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setAspectRatio(event.target.value);
  }
  return (
    <div className="w-full bg-gray-800 text-white p-4 flex items-center gap-4 ">
      <h1 className="text-2xl font-bold">Studio</h1>
      <div className="flex items-center gap-2">
        <p className="font-bold">aspect ratio: </p>
        <input
          type="text"
          className="rounded-md p-1 text-black"
          onChange={handleOnChange}
          value={aspectRatio}
        />
      </div>
    </div>
  );
};

interface RightPanelProps {
  selectedPage: string | null;
}
const RightPanel: React.FC<RightPanelProps> = ({ selectedPage }) => {
  const [pages, setPages] = useRecoilState(pagesState);
  const page = selectedPage ? pages.get(selectedPage) : undefined;

  return (
    <div
      className="bg-white border-l-4 border-gray-200 border-solid   text-black col-span-1"
      onMouseOver={() => console.log("hello")}
    >
      {" "}
      <h1 className="font-bold text-center p-4 text-lg border-b-2 border-gray-200 ">
        right panel
      </h1>
      {page !== undefined && (
        <div className="px-4">
          <h1 className="font-bold text-center p-4 text-lg  ">
            Page name:{page.name}
          </h1>
          <h1 className="font-bold text-center p-4 text-lg  ">
            Page number:{page.pageNumber}
          </h1>
          <h1 className="font-bold text-center p-4 text-lg  ">
            Page layout:{page.layout ? page.layout : "no layout"}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {layouts.map((layout, index) => {
              return (
                <button
                  className={clsx("p-2 bg-gray-100 hover:bg-gray-50 border", {
                    " border-red-500": page.layout === layout,
                  })}
                  key={layout}
                  onClick={() => {
                    setPages((currentPages) => {
                      let oldPage = currentPages.get(selectedPage!)!;
                      currentPages.set(selectedPage!, { ...oldPage, layout });
                      return new Map(currentPages);
                    });
                  }}
                >
                  {layout}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

function renderLayout(layout: TLayout) {
  return (
    <div className={layout.style}>
      {" "}
      {layout.blocks.map((block) => renderBlock(block))}{" "}
    </div>
  );
}

function renderBlock({ style, image, text }: TBlock) {
  return (
    <div className={style}>
      {image && <img className={image.style} src={image.src} alt="" />}
      {text &&
        text.map((t) => (
          <p className={t.style} key={t.content}>
            {t.content}
          </p>
        ))}
    </div>
  );
}
