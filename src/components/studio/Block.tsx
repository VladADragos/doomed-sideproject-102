import clsx from "clsx";
import Draggable from "../dnd/Draggable";
import placeholder from "../../assets/images/placeholder.png";
import { useSetRecoilState } from "recoil";
import { slotsState } from "../../state/studio";
type BlockProps = {
  name: string;
  imageSrc: string;
};

const Block: React.FC<BlockProps> = ({ name, imageSrc }) => {
  const setter = useSetRecoilState(slotsState);

  return (
    <Draggable
      id={name}
      onDragEnd={({ droppedItem, dropZone }) => {
        setter((currentValue) => {
          return new Map(currentValue.set(dropZone, droppedItem));
        });
      }}
    >
      {({ isDragging }) => {
        return (
          <div
            className={clsx("p-4", {
              "bg-gray-200": isDragging,
              "bg-blue-700": !isDragging,
            })}
          >
            {name}
            <img src={imageSrc} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default Block;
