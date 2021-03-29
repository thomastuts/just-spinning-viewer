import { useEffect } from "react";
import { Howl } from "howler";

import Timer from "../../sounds/mixkit-game-show-happy-timer-666.wav";
import Reveal from "../../sounds/mixkit-revealing-bonus-notification-958.wav";
import ShowOpener from "../../sounds/game-show-opener.mp3";
import SpinTheWheel from "../../sounds/spin-the-wheel.mp3";
import WellBePlaying from "../../sounds/well-be-playing.mp3";
import TonightsContestant from "../../sounds/reveal-tonights-contestant.mp3";
import ShowTime from "../../sounds/showtime.mp3";
import GameTitleIcebreaker from "../../sounds/game-title-icebreaker.mp3";
import GameTitleLegsOrHotdogs from "../../sounds/game-title-legs-or-hotdogs.mp3";
import GameTitlePuttingItOnTheLine from "../../sounds/game-title-line.mp3";
import GameTitleShootingBlanks from "../../sounds/game-title-shooting-blanks.mp3";
import GameTitleSlowBurn from "../../sounds/game-title-slow-burn.mp3";

const AUDIO_URLS_BY_ID = {
  Timer,
  Reveal,
  ShowOpener,
  SpinTheWheel,
  GameTitleIcebreaker,
  GameTitleLegsOrHotdogs,
  GameTitlePuttingItOnTheLine,
  GameTitleShootingBlanks,
  GameTitleSlowBurn,
  WellBePlaying,
  TonightsContestant,
  ShowTime,
};

const Audio = ({
  id,
  volume = 1,
  delay = 0,
  fadeOnUnmount = false,
  fadeDurationInSeconds = 2,
}) => {
  useEffect(() => {
    const src = AUDIO_URLS_BY_ID[id];

    console.log("Playing:", id, src);

    if (!src) {
      console.warn(`No sound file found for '${id}'`);
      return;
    }

    const sound = new Howl({
      src: [src],
      volume,
    });

    setTimeout(() => {
      sound.play();
    }, delay * 1000);

    return () => {
      if (fadeOnUnmount) {
        sound.fade(1, 0, fadeDurationInSeconds * 1000);
      }
    };
  }, [id]);

  return null;
};

export default Audio;
