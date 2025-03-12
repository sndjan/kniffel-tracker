import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Button, Dialog, Input } from 'shadcn/ui';
import PlayerList from '../components/PlayerList';
import PlayerDialog from '../components/PlayerDialog';

const KniffelTracker = () => {
  const [players, setPlayers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const handleAddPlayer = (name) => {
    setPlayers([...players, { id: players.length, name }]);
  };

  const handleEditPlayer = (id, name) => {
    setPlayers(players.map(player => player.id === id ? { ...player, name } : player));
  };

  const handleDeletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPlayers((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kniffel Tracker</h1>
      <Button onClick={() => setIsDialogOpen(true)}>Add Player</Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={players} strategy={verticalListSortingStrategy}>
          <PlayerList players={players} onEdit={handleEditPlayer} onDelete={handleDeletePlayer} />
        </SortableContext>
      </DndContext>
      <PlayerDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddPlayer}
        currentPlayer={currentPlayer}
      />
    </div>
  );
};

export default KniffelTracker;
