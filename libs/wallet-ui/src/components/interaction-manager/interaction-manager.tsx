import { produce } from 'immer'
import { omit } from 'ramda'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'

import { useGlobal } from '../../contexts/global/global-context'
import { InteractionFlow } from './interaction-flow'
import type { Interaction, RawInteraction } from '../../types/interaction'

type IndexedInteractions = {
  ids: string[]
  values: Record<string, Interaction[]>
}

/**
 * Handles incoming interactions
 */
export function InteractionManager() {
  const { service } = useGlobal()
  const [interactions, setInteractions] = useState<IndexedInteractions>({
    ids: [],
    values: {},
  })
  const traceID = interactions.ids[0]
  const events = traceID ? interactions.values[traceID] : undefined

  // Get any already pending tx on startup
  useEffect(() => {
    // Listen for new incoming transactions
    service.EventsOn('new_interaction', (interaction: RawInteraction) => {
      setInteractions((interactions) =>
        produce(interactions, (interactions) => {
          const wrappedInteraction = {
            meta: {
              id: nanoid(),
            },
            event: interaction,
          }

          if (
            !interactions.ids.includes(interaction.traceID) ||
            !interactions.values[interaction.traceID]
          ) {
            interactions.ids.push(interaction.traceID)
            interactions.values[interaction.traceID] = [wrappedInteraction]
            return
          }
          interactions.values[interaction.traceID].push(wrappedInteraction)
        })
      )
    })
    return () => {
      service.EventsOff('new_interaction')
    }
  }, [service])

  if (!events) {
    return null
  }

  return (
    <InteractionFlow
      events={events}
      onFinish={() => {
        setInteractions((interactions) => ({
          ids: interactions.ids.slice(1),
          values: omit(interactions.ids.slice(0, 1), interactions.values),
        }))
      }}
    />
  )
}
