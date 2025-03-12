import React, { useState, useEffect } from 'react';
import { Dialog, Input, Button } from 'shadcn/ui';

const PlayerDialog = ({ isOpen, onClose, onSave, currentPlayer }) => {
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentPlayer) {
      setName(currentPlayer.name);
    } else {
      setName('');
    }
  }, [currentPlayer]);

  const handleSave = () => {
    onSave(name);
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">{currentPlayer ? 'Edit Player' : 'Add Player'}</h2>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter player name"
          className="mb-4"
        />
        <div className="flex justify-end">
          <Button onClick={onClose} className="mr-2">Cancel</Button>
          <Button onClick={handleSave}>{currentPlayer ? 'Save' : 'Add'}</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default PlayerDialog;
