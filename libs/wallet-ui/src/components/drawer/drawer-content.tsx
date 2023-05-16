import { useCallback, useEffect } from 'react'

import { DrawerPanel, useGlobal } from '../../contexts/global/global-context'
import { ChevronLeft } from '../icons/chevron-left'
import { DRAWER_HEIGHT } from '../drawer'
import { DrawerAddNetwork } from './drawer-add-network'
import { DrawerEditNetwork } from './drawer-edit-network'
import { DrawerHead } from './drawer-head'
import { DrawerManageNetwork } from './drawer-manage-network'
import { DrawerNetwork } from './drawer-network'
import { ServiceStatus } from './service-status'
import { NetworkInfo } from '../network-info'

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

  const setViewingNetwork = useCallback(
    (viewingNetwork: string) => {
      dispatch(actions.setDrawerAction(true, DrawerPanel.View, viewingNetwork))
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
            <DrawerBackButton onClick={() => setView(DrawerPanel.Network)} />
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerManageNetwork
              setView={setView}
              setViewingNetwork={setViewingNetwork}
              setEditingNetwork={setEditingNetwork}
            />
          </DrawerContentWrapper>
        </>
      )
    }
    case DrawerPanel.View: {
      return (
        <>
          <DrawerHead
            height={DRAWER_HEIGHT}
            isOpen={state.drawerState.isOpen}
            setOpen={handleToggle}
            title="Manage networks"
          >
            <DrawerBackButton onClick={() => setView(DrawerPanel.Network)} />
          </DrawerHead>
          <DrawerContentWrapper>
            <NetworkInfo network={state.drawerState.selectedNetwork} />
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
            title={state.drawerState.selectedNetwork}
            setOpen={handleToggle}
          >
            <DrawerBackButton onClick={() => setView(DrawerPanel.Manage)} />
          </DrawerHead>
          <DrawerContentWrapper>
            <DrawerEditNetwork
              selectedNetwork={state.drawerState.selectedNetwork}
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
            <DrawerBackButton onClick={() => setView(DrawerPanel.Manage)} />
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
  const { state } = useGlobal()
  const isHidden = !state.drawerState.isOpen

  return <div className="p-[20px] text-base">{!isHidden ? children : null}</div>
}

function DrawerBackButton({ onClick }: { onClick: () => void }) {
  return (
    <button data-testid="back" className="flex items-center" onClick={onClick}>
      <ChevronLeft className="w-[14px] mr-[6px]" />
      Back
    </button>
  )
}
