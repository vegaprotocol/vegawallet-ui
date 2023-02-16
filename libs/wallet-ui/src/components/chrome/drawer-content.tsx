import { useCallback, useEffect } from 'react'

import { DrawerPanel, useGlobal } from '../../contexts/global/global-context'
import { ButtonUnstyled } from '../button-unstyled'
import { ChevronLeft } from '../icons/chevron-left'
import { DRAWER_HEIGHT } from '.'
import { DrawerAddNetwork } from './drawer-add-network'
import { DrawerEditNetwork } from './drawer-edit-network'
import { DrawerHead } from './drawer-head'
import { DrawerManageNetwork } from './drawer-manage-network'
import { DrawerNetwork } from './drawer-network'
import { ServiceStatus } from './service-status'

/**
 * Renders different drawer content based on 'view' state
 */
export function DrawerContent() {
  const { state, actions, dispatch } = useGlobal()

  // Close modal on escape key
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dispatch(actions.setDrawerAction(false))
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [dispatch, actions])

  const handleToggle = useCallback(
    (isOpen: boolean) => {
      dispatch(actions.setDrawerAction(isOpen))
    },
    [dispatch, actions]
  )

  const setView = useCallback(
    (panel: DrawerPanel) => {
      dispatch(actions.setDrawerAction(true, panel))
    },
    [dispatch, actions]
  )

  const setEditingNetwork = useCallback(
    (editingNetwork: string) => {
      dispatch(actions.setDrawerAction(true, DrawerPanel.Edit, editingNetwork))
    },
    [dispatch, actions]
  )

  switch (state.drawerState.panel) {
    case DrawerPanel.Network: {
      return (
        <>
          <DrawerHead
            height={DRAWER_HEIGHT}
            isOpen={state.drawerState.isOpen}
            setOpen={handleToggle}
          >
            <ServiceStatus />
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerNetwork setView={setView} />
          </DrawerContentWrapper>
        </>
      )
    }
    case DrawerPanel.Manage: {
      return (
        <>
          <DrawerHead
            height={DRAWER_HEIGHT}
            isOpen={state.drawerState.isOpen}
            setOpen={handleToggle}
            title="Manage networks"
          >
            <ButtonUnstyled
              data-testid="back"
              className="no-underline"
              onClick={() => setView(DrawerPanel.Network)}
            >
              <ChevronLeft className="w-[14px] mr-[6px]" />
              Back
            </ButtonUnstyled>
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerManageNetwork
              setView={setView}
              setEditingNetwork={setEditingNetwork}
            />
          </DrawerContentWrapper>
        </>
      )
    }
    case DrawerPanel.Edit: {
      return (
        <>
          <DrawerHead
            height={DRAWER_HEIGHT}
            isOpen={state.drawerState.isOpen}
            title={state.drawerState.editingNetwork}
            setOpen={handleToggle}
          >
            <ButtonUnstyled
              data-testid="back"
              className="no-underline"
              onClick={() => setView(DrawerPanel.Manage)}
            >
              Back
            </ButtonUnstyled>
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerEditNetwork
              selectedNetwork={state.drawerState.editingNetwork}
            />
          </DrawerContentWrapper>
        </>
      )
    }
    case DrawerPanel.Add: {
      return (
        <>
          <DrawerHead
            height={DRAWER_HEIGHT}
            isOpen={state.drawerState.isOpen}
            setOpen={handleToggle}
            title="Add network"
          >
            <ButtonUnstyled
              data-testid="back"
              className="no-underline"
              onClick={() => setView(DrawerPanel.Manage)}
            >
              Back
            </ButtonUnstyled>
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerAddNetwork />
          </DrawerContentWrapper>
        </>
      )
    }
    default: {
      throw new Error('Invalid drawer view')
    }
  }
}

interface DrawerContentWrapperProps {
  children: React.ReactNode
}

function DrawerContentWrapper({ children }: DrawerContentWrapperProps) {
  return <div className="p-[20px]">{children}</div>
}
