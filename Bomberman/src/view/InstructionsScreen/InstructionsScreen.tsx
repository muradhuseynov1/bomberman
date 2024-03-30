import React from 'react';
import { useNavigate } from 'react-router-dom';
import { InstructionsBackground, StyledDialog, StyledDialogTitle, StyledDialogContent, DialogActions, BackButton } from './InstructionsScreen.styles';

export const InstructionsScreen = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate(-1);

  return (
    <InstructionsBackground>
      <StyledDialog
        open={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <StyledDialogTitle id="customized-dialog-title">
          Welcome to Bomberman!
        </StyledDialogTitle>
        <StyledDialogContent dividers>
            <p>Welcome to <strong>Bomberman</strong>! Dive into an explosive adventure with our Custom Bomberman game, where strategy, speed, and sharp reflexes lead to victory. Play against your friends or the computer in this dynamic, tile-based arena filled with dangers and delights. Here's how to play:</p>
            
            <h2>Objective</h2>
            <p>The aim is simple: be the last Bomberman standing. Navigate the 2D field, plant bombs to eliminate obstacles and opponents, and dodge monsters to survive.</p>
            
            <h2>Game Setup</h2>
            <p><strong>Maps:</strong> Choose from 3 distinct maps, each with its own layout of indestructible walls, destructible boxes, and bonuses. Maps can have various shapes, providing unique strategic challenges.</p>
            <p><strong>Players:</strong> Two or optionally three players can join the fray, each controlling a Bomberman character. Aim to outlast your opponents by utilizing bombs, power-ups, and quick movements.</p>
            <p><strong>Wins:</strong> Before starting, set the number of wins required for a victory. Track your progress after each round, aiming to meet the set target. Draws count as a loss for all involved.</p>
            
            <h2>Controls and Movement</h2>
            <p><strong>Movement:</strong> Use your keyboard to move your character up, down, left, or right. Navigate the field to avoid dangers and position yourself strategically.</p>
            <p><strong>Bombs:</strong> Place bombs on your current tile with a special action button. Each bomb explodes in a cross-shaped blast after a short delay, affecting adjacent tiles but blocked by walls and boxes.</p>
            <p><strong>Custom Controls:</strong> Customize your control scheme from the settings menu. Your last configuration is saved and applied automatically at game start.</p>
            
            <h2>Gameplay Elements</h2>
            <p><strong>Walls and Boxes:</strong> Navigate around indestructible walls and destructible boxes. Boxes may hide power-ups or curses, revealed only when destroyed.</p>
            <p><strong>Monsters:</strong> Avoid monsters roaming the field. If they touch your Bomberman, it's game over. Their movement is unpredictable, changing direction upon hitting obstacles or randomly over time.</p>
            <p><strong>Power-Ups:</strong> Enhance your Bomberman with bonuses from destroyed boxes, such as increased bomb count, expanded blast range, and unique abilities like invincibility or passing through obstacles.</p>
            <p><strong>Curses:</strong> Beware of picking up curses that can slow you down, limit your bomb's blast range, or force premature bomb placement.</p>
            
            <h2>Advanced Gameplay</h2>
            <p><strong>Chain Reactions:</strong> Bombs can trigger other bombs, creating devastating chain reactions. Use this to your advantage, setting up traps and strategic strikes.</p>
            <p><strong>Special Power-Ups:</strong> Seek out advanced bonuses for game-changing abilities like detonating bombs on command, increased speed, and the power to place additional obstacles on the field.</p>
            <p><strong>Hindering Curses:</strong> Unlucky finds can hinder your progress. Learn to adapt quickly to challenges like decreased speed or forced bomb placement.</p>
            
            <h2>End Game</h2>
            <p>The game concludes when one Bomberman remains or all players meet their demise, resulting in a draw. Survive monster encounters and explosions to claim victory. After each round, review the scores and aim for the set number of wins to achieve ultimate victory.</p>
            
            <h2>Tips for Success</h2>
            <p><strong>Strategic Bombing:</strong> Plan your bomb placements not just to destroy obstacles, but to trap opponents or defend yourself against monsters.</p>
            <p><strong>Monitor Power-Ups:</strong> Keep track of your bonuses and use them to your advantage, adapting your strategy to the power-ups at your disposal.</p>
            <p><strong>Adapt and Overcome:</strong> Stay alert to the changing dynamics of the game field. Adapt to curses, capitalize on power-ups, and anticipate your opponents' moves.</p>
            
            <p><strong>Ready, Set, Explode!</strong> With customizable controls, a variety of maps, and a mix of strategic elements, Custom Bomberman offers endless fun and competition. Whether it's a duel or a three-player showdown, only the cleverest and quickest will emerge victorious.</p>
            </StyledDialogContent>
        <DialogActions>
            <BackButton onClick={handleClose} />
        </DialogActions>
      </StyledDialog>
    </InstructionsBackground>
  );
};
