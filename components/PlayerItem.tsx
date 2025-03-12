import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from 'shadcn/ui';

const PlayerItem = ({ player, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: player.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="player-item flex justify-between items-center p-2 border-b">
      <span>{player.name}</span>
      <div>
        <Button onClick={() => onEdit(player.id)}>Edit</Button>
        <Button onClick={() => onDelete(player.id)}>Delete</Button>
      </div>
    </div>
  );
};

export default PlayerItem;
