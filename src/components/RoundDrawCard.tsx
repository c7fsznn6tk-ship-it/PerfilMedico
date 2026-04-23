import card01 from '../assets/turn-cards/1dica.jpg'
import card02 from '../assets/turn-cards/2dicas.jpg'
import card03 from '../assets/turn-cards/3dicas.jpg'
import cardDefault from '../assets/turn-cards/proximarodada.jpg'
import type { TurnPhase, TurnRollOutcome } from '../types'

type RoundDrawCardProps = {
  phase: TurnPhase
  outcome: TurnRollOutcome | null
  showDefaultFace?: boolean
  disabled?: boolean
  onClick: () => void
}

const outcomeImageMap = {
  '1': card01,
  '2': card02,
  '3': card03,
} satisfies Record<'1' | '2' | '3', string>

export function RoundDrawCard({
  phase,
  outcome,
  showDefaultFace = false,
  disabled = false,
  onClick,
}: RoundDrawCardProps) {
  const isDrawing = phase === 'sorteando'
  const imageSrc = showDefaultFace ? cardDefault : outcome ? outcomeImageMap[outcome.face] : cardDefault
  const imageAlt = showDefaultFace ? 'Carta proxima rodada' : outcome?.label ?? 'Carta proxima rodada'

  return (
    <article className="card-shell round-draw-shell">
      <button
        type="button"
        className={`round-draw-card ${isDrawing ? 'is-drawing' : ''}`}
        onClick={onClick}
        disabled={disabled}
        aria-label="Carta proxima rodada"
      >
        <img
          className={`round-draw-card-image ${isDrawing ? 'is-processing' : ''}`}
          src={imageSrc}
          alt={imageAlt}
          draggable={false}
        />
        {isDrawing ? (
          <div className="round-draw-overlay" aria-hidden="true">
            <span className="round-draw-dots">
              <span />
              <span />
              <span />
            </span>
          </div>
        ) : null}
      </button>
    </article>
  )
}
