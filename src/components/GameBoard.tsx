import type { RefObject } from 'react'
import type { CardInPlay, TurnPhase, TurnRollOutcome } from '../types'
import { CardTile } from './CardTile'
import { RoundDrawCard } from './RoundDrawCard'

type GameBoardProps = {
  board: CardInPlay[]
  activeSlotId: number | null
  cardFrontImage?: string | null
  cardBackImage?: string | null
  currentGroupName?: string | null
  currentTurnSummary?: string | null
  turnPhase: TurnPhase
  currentTurnOutcome?: TurnRollOutcome | null
  drawCardRef?: RefObject<HTMLDivElement>
  interactionLocked: boolean
  onAdvanceTurn: () => void
  onDrawTurn: () => void
  onCardClick: (slotId: number) => void
  onShowAnswer: (slotId: number) => void
  onExpandCard: (slotId: number) => void
}

export function GameBoard({
  board,
  activeSlotId,
  cardFrontImage,
  cardBackImage,
  currentGroupName,
  currentTurnSummary,
  turnPhase,
  currentTurnOutcome,
  drawCardRef,
  interactionLocked,
  onAdvanceTurn,
  onDrawTurn,
  onCardClick,
  onShowAnswer,
  onExpandCard,
}: GameBoardProps) {
  return (
    <section className="panel board-panel">
      <div className="section-header">
        <div className="board-header-title">
          <h2>Cartas em jogo</h2>
          <button type="button" className="ghost-button board-advance-button" onClick={onAdvanceTurn}>
            Avancar turno
          </button>
        </div>
        <div className="board-status">
          <span className="board-current-group">
            {currentGroupName ? `Grupo jogando: ${currentGroupName}` : 'Aguardando inicio da partida'}
          </span>
          {currentTurnSummary ? (
            <span className="board-turn-chip">Rodada: {currentTurnSummary}</span>
          ) : (
            <span className="board-turn-chip is-waiting">Clique na carta da rodada para sortear</span>
          )}
          <span>{board.length} cartas + 1 carta da rodada</span>
        </div>
      </div>

      <div className="board-grid">
        <div ref={drawCardRef}>
          <RoundDrawCard
            phase={turnPhase}
            outcome={currentTurnOutcome ?? null}
            showDefaultFace={turnPhase === 'jogando' && activeSlotId !== null}
            disabled={turnPhase === 'sorteando'}
            onClick={onDrawTurn}
          />
        </div>
        {board.map((slot) => (
          <CardTile
            key={`${slot.slotId}-${slot.cardId}`}
            slot={slot}
            frontImage={cardFrontImage}
            backImage={cardBackImage}
            isActive={activeSlotId === slot.slotId}
            interactionLocked={interactionLocked}
            onClick={() => onCardClick(slot.slotId)}
            onShowAnswer={() => onShowAnswer(slot.slotId)}
            onExpand={() => onExpandCard(slot.slotId)}
          />
        ))}
      </div>
    </section>
  )
}
