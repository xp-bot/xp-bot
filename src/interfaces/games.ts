export interface IGameResult {
  /** This is true, if a cooldown prevented the user to gain xp. */
  hitCooldown: boolean;
  countdownRemaining?: number;
  result: number;
  xp: number;
}
