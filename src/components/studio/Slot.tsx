import clsx from "clsx";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { selectSlotData, selectBlock } from "../../state/studio";
import DropZone from "../dnd/DropZone";

type SlotProps = {
  name: string;
};

const Slot: React.FC<SlotProps> = ({ name }) => {
  let slotContent = useRecoilValue(selectSlotData(name));
  let block = useRecoilValue(selectBlock(slotContent));
  return (
    <DropZone id={name}>
      {({ isActive, canDrop }) => {
        return (
          <div
            className={clsx("p-4 w-full h-full", {
              "bg-slate-800": !canDrop && !isActive,
              "bg-green-500": canDrop,
              "bg-slate-50 text-black": isActive,
            })}
          >
            {block && (
              <div>
                <p>{block.name}</p>
                <img src={block.imageSrc} alt="" />
              </div>
            )}
          </div>
        );
      }}
    </DropZone>
  );
};

export default Slot;
