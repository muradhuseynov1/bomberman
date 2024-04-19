import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import {
  InstructionsBackground,
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  DialogActions,
  BackButton,
} from './InstructionsScreen.styles';

export const InstructionsScreen = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate('/');

  return (
    <InstructionsBackground>
      <StyledDialog
        open
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
      >
        <StyledDialogTitle id="customized-dialog-title">
          Welcome to Bomberman!
        </StyledDialogTitle>
        <StyledDialogContent dividers>
          <Typography variant="body1">
            Welcome to
            <strong>Bomberman</strong>
            ! Dive into an explosive adventure with our custom Bomberman game,
            where strategy, speed, and sharp reflexes lead to victory.
            Play against your friend(s) in this dynamic,
            tile-based arena filled with dangers and delights.
            Here&apos;s a guide to get you started.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">Objective</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            The aim is simple: be the last Bomberman standing.
            Navigate the 2D field, plant bombs to eliminate obstacles and opponents,
            and dodge monsters to survive.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">Game Setup</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            <strong>Maps:</strong>
            {' '}
            Choose from 3 distinct maps, each with its own layout of indestructible walls,
            destructible boxes, and bonuses. Maps can have various shapes,
            providing unique strategic challenges.
          </Typography>
          <Typography variant="body1">
            <strong>Players:</strong>
            {' '}
            Two or optionally three players can join the fray, each controlling a
            Bomberman character.Aim to outlast your opponents by utilizing bombs,
            power-ups, and quick movements.
          </Typography>
          <Typography variant="body1">
            <strong>Wins:</strong>
            {' '}
            Before starting, set the number of wins required for a victory.
            Track your progress after each round, aiming to meet the set target.
            Draws count as a loss for all involved.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">Controls and Movement</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            <strong>Movement:</strong>
            {' '}
            Use your keyboard to move your character up, down, left, or right.
            Navigate the field to avoid dangers and position yourself strategically.
          </Typography>
          <Typography variant="body1">
            <strong>Bombs:</strong>
            {' '}
            Place bombs on your current tile with a special action button.
            Each bomb explodes in a cross-shaped blast after a short delay,
            affecting adjacent tiles but blocked by walls and boxes.
          </Typography>
          <Typography variant="body1">
            <strong>Custom Controls:</strong>
            {' '}
            Customize your control scheme from the settings menu.
            Your last configuration is saved and applied automatically at game start.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">Gameplay Elements</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            <strong>Walls and Boxes:</strong>
            {' '}
            Navigate around indestructible walls and destructible boxes.
            Boxes may hide power-ups or curses, revealed only when destroyed.
          </Typography>
          <Typography variant="body1">
            <strong>Monsters:</strong>
            {' '}
            Avoid monsters roaming the field. If they touch your Bomberman,
            it&apos;s game over. Their movement is unpredictable, changing direction
            upon hitting obstacles or randomly over time.
          </Typography>
          <Typography variant="body1">
            <strong>Power-Ups:</strong>
            {' '}
            Enhance your Bomberman with bonuses from destroyed boxes,
            such as increased bomb count, expanded blast range, and unique abilities like
            invincibility or passing through obstacles.
          </Typography>
          <Typography variant="body1">
            <strong>Curses:</strong>
            {' '}
            Beware of picking up curses that can slow you down,
            limit your bomb&apos;s blast range, or force premature bomb placement.
          </Typography>
          {' '}
          <br />
          {' '}
          <Typography variant="h4">Advanced Gameplay</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            <strong>Chain Reactions:</strong>
            {' '}
            Bombs can trigger other bombs,
            creating devastating chain reactions. Use this to your advantage,
            setting up traps and strategic strikes.
          </Typography>
          <Typography variant="body1">
            <strong>Special Power-Ups:</strong>
            {' '}
            Seek out advanced bonuses for game-changing abilities like detonating bombs on command,
            increased speed, and the power to place additional obstacles on the field.
          </Typography>
          <Typography variant="body1">
            <strong>Hindering Curses:</strong>
            {' '}
            Unlucky finds can hinder your progress. Learn to adapt quickly to challenges like
            decreased speed or forced bomb placement.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">End Game</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            The game concludes when one Bomberman remains or all
            players meet their demise, resulting in a draw.
            Survive monster encounters and explosions to claim victory. After each round,
            review the scores and aim for the set number of wins to achieve ultimate victory.
          </Typography>
          {' '}
          <br />
          <Typography variant="h4">Tips for Success</Typography>
          {' '}
          <br />
          <Typography variant="body1">
            <strong>Strategic Bombing:</strong>
            {' '}
            Plan your bomb placements not just to destroy obstacles,
            but to trap opponents or defend yourself against monsters.
          </Typography>
          <Typography variant="body1">
            <strong>Monitor Power-Ups:</strong>
            {' '}
            Keep track of your bonuses and use them to your advantage,
            adapting your strategy to the power-ups at your disposal.
          </Typography>
          <Typography variant="body1">
            <strong>Adapt and Overcome:</strong>
            {' '}
            Stay alert to the changing dynamics of the game field.
            Adapt to curses, capitalize on power-ups, and anticipate your opponents&apos; moves.
          </Typography>
          <Typography variant="body1">
            <strong>Ready, Set, Explode!</strong>
            {' '}
            With customizable controls, a variety of maps, and a mix of strategic elements,
            Custom Bomberman offers endless fun and competition. Whether it&apos;s a duel or
            a three-player showdown, only the cleverest and quickest will emerge victorious.
          </Typography>
        </StyledDialogContent>
        <DialogActions>
          <BackButton onClick={handleClose} />
        </DialogActions>
      </StyledDialog>
    </InstructionsBackground>
  );
};
