import { useDnD } from "@/contexts/dragADrop/DragAndDropContext";
import { NodeType } from "@/nodes/Nodes";

const NodeSider = () => {
  const [_, setType] = useDnD();
 
  const onDragStart = (event: React.DragEvent<HTMLDivElement>, nodeType: NodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'script')} draggable>
        Script Node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div>
    </aside>
  );
}

export default NodeSider;