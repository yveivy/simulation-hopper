import { useState } from 'react';

export const useDialogue = () => {
  const [dialogueList, setDialogueList] = useState([
    { speaker: 'Speaker 1', text: 'Text 1' },
    { speaker: 'Speaker 2', text: 'Text 2' }
  ]);

  const addDialogue = (speaker, text) => {
    setDialogueList([...dialogueList, { speaker, text }]);
  };

  return {
    dialogueList,
    addDialogue,
  };
};