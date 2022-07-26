import { useDrag } from "react-dnd";

interface DraggableProps {
  children: (props: { isDragging: boolean }) => JSX.Element;
  id: string;
  onDragEnd: (dragEndParams: { droppedItem: string; dropZone: string }) => void;
}
interface DropResult {
  id: string;
}
export const Draggable: React.FC<DraggableProps> = ({
  children,
  onDragEnd,
  id,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "BOX",
    item: { id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        onDragEnd({ droppedItem: item.id, dropZone: dropResult.id });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} data-testid={`box`}>
      {children({ isDragging })}
    </div>
  );
};

export default Draggable;
