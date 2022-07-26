import { useDrop } from "react-dnd";

interface DropZoneProps {
  children: (peopa: { isActive: boolean; canDrop: boolean }) => JSX.Element;
  id: string;
}

function DropZone({ children, id }: DropZoneProps) {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "BOX",
    drop: () => ({ id }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div ref={drop} data-testid="dustbin" className="w-full h-full flex-1">
      {children({ isActive: canDrop && !isOver, canDrop: canDrop && isOver })}
    </div>
  );
}

export default DropZone;
