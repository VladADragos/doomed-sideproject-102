import dynamic from "next/dynamic";
import type { NextPage } from "next";
import placeholder from "../../assets/images/placeholder.png";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Draggable from "../../components/dnd/Draggable";
import clsx from "clsx";
import DropZone from "../../components/dnd/DropZone";
import Block from "../../components/studio/Block";
import Slot from "../../components/studio/Slot";
import price from "../../assets/images/price.png";
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import {
  aspectRatioState,
  blocksState,
  pagesState,
  slotsState,
} from "../../state/studio";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
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
  let aspectRatio = useRecoilValue(aspectRatioState);

  return (
    <div className={clsx("bg-white flex", `aspect-[${aspectRatio}]`)}>
      <div className="flex flex-1">
        <div className="flex flex-col bg-gray-700 w-3/12 ml-12 items-center text-white">
          <div className="mb-12 flex flex-col items-center">
            <img className="grow-0" src={placeholder.src} alt="" />
            <h2 className="font-bold text-4xl text-yellow-300 pt-2">Lidl </h2>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex">
              <img src={placeholder.src} alt="" />
              <div className="pl-2">
                <h3 className="text-2xl">Minion</h3>
                <ul className="list-disc pl-6">
                  <li>Ba</li>
                  <li>Na</li>
                  <li>Na</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center">
          <MainHeading
            period="Måndag-söndag 18/7-24/7"
            title="VECKANS SUPERKLIPP"
            subtitle="Högsta klatitet till lägsta pris"
          />
          <div className="grid grid-cols-2 w-full h-full gap-4">
            <Slot name="slot1" />
            <Slot name="slot2" />
            <Slot name="slot3" />
            <Slot name="slot4" />
          </div>
        </div>
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

const Studio = () => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  const [pages, setPages] = useRecoilState(pagesState);
  useEffect(() => {
    setBlocks(() => {
      const map = new Map(initialBlocks);
      return map;
    });
  }, []);

  const [selectedPage, setSelectedPage] = useState<number | null>(null);

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
            {pages.map((s, i) => {
              return (
                <div
                  key={i}
                  onClick={() => setSelectedPage(i)}
                  className={clsx(
                    "hover:border-teal-300  border-white border-2",
                    { "border-teal-300": i === selectedPage }
                  )}
                >
                  <p className="text-md font-bold mb-2">page {i}</p>
                  <div className="aspect-[210/297]  bg-gray-100 flex-shrink-0">
                    empty page...
                  </div>
                </div>
              );
            })}
            <button
              className="bg-gray-300 font-bold text-xl p-2  rounded-md w-full hover:bg-gray-200"
              onClick={() => {
                setPages((currentPages) => {
                  return [...currentPages, "anotha one"];
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
  selectedPage: number | null;
}
const RightPanel: React.FC<RightPanelProps> = ({ selectedPage }) => {
  return (
    <div className="bg-white border-l-4 border-gray-200 border-solid   text-black col-span-1">
      {" "}
      <h1 className="font-bold text-center p-4 text-lg border-b-2 border-gray-200 ">
        right panel
      </h1>
      {selectedPage !== null && (
        <div className="px-4">
          <h1 className="font-bold text-center p-4 text-lg  ">
            selected page {selectedPage.toString()}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-2 bg-gray-100 hover:bg-gray-50">
              layout 1
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-50">
              layout 2
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-50">
              layout 3
            </button>
            <button className="p-2 bg-gray-100 hover:bg-gray-50">
              layout 4
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
