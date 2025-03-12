import React from 'react';
import { Button } from 'shadcn/ui';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PlayerList = ({ players, onEdit, onDelete }) => {
  return (
    <div className="player-list">
      {players.map(player => (
        <PlayerItem
          key={player.id}
          player={player}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

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

export default PlayerList;
