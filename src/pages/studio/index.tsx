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
import price from "../../assets/images/price.png"
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { blocksState, slotsState } from "../../state/studio";
import { useEffect } from "react";
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
  let x = useRecoilValue(slotsState);
  console.log(x.values());
  return (
    <div className="bg-white h-full w-full flex ">
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


const StudioOverlay = ()=>
{

  return (<div className="absolute w-full h-full bg-[#969696d9]  z-100 flex items-center justify-center">
    <div className="flex flex-col bg-white  w-3/6 p-8">
      <h1 className="text-2xl font-bold">select overlay</h1>
      <div className="grid grid-cols-2 flex-1 gap-4">
        <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">a</div>
        <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">b</div>
        <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">c</div>
        <div className="w-full h-full bg-gray-300 p-4 hover:bg-gray-200">d</div>
      </div> 
    </div>
    
    </div>)

}

export default StudioPage;

const initialBlocks: [string, { name: string; imageSrc: string }][] = [
  [
    "test00",
    {
      name: "test00",
      imageSrc:
        price.src,
    },
  ],
];



const Studio = () => {
  const [blocks, setBlocks] = useRecoilState(blocksState);
  useEffect(() => {
    setBlocks(() => {
      const map = new Map(initialBlocks);
      return map;
    });
  }, []);

  return (
    <div className="w-screen h-screen bg-blue-50 flex flex-col relative z-0">
      <StudioOverlay />
      <div className="w-full bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Studio</h1>
      </div>
      <div className="flex  bg-red-500 flex-1">
        <div className="bg-gray-300 w-3/12 text-white">
          <div className="grid grid-cols-2 p-4 gap-4">
            {[...blocks.values()].map(({ name, imageSrc }) => {
              return <Block key={name} name={name} imageSrc={imageSrc}></Block>;
            })}
          </div>
        </div>
        <div className="bg-blue-200 flex-1">
          {" "}
          <Template></Template>
        </div>
        <div className="bg-gray-300 w-3/12 text-white"> right panel</div>
      </div>
    </div>
  );
};
