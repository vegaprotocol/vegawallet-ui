import classnames from 'classnames'
import { useCallback } from 'react'
import type { DropResult } from 'react-beautiful-dnd'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@vegaprotocol/ui-toolkit'

import { Intent } from '../../config/intent'
import type { KeyPair, Wallet } from '../../contexts/global/global-context'
import { useGlobal } from '../../contexts/global/global-context'
import { useCurrentKeypair } from '../../hooks/use-current-keypair'
import type { Meta } from '../../hooks/use-keypair-update'
import { useKeypairUpdate } from '../../hooks/use-keypair-update'
import { Validation } from '../../lib/form-validation'
import { Dialog } from '../dialog'
import { FormGroup } from '../form-group'
import { Input } from '../forms/input'
import { PublicKey } from '../public-key'
import { ButtonGroup } from '../button-group'

const notName = (value: string) =>
  value === 'name' ? 'Name is already in use' : true

const rowClass = 'w-full grid gap-[12px] grid-cols-[20px_1fr_1fr_auto]'

const cellClass = 'flex items-center h-[40px] mt-[5px]'

export function UpdateKeypairDialog() {
  const { state } = useGlobal()
  const { keypair, wallet } = useCurrentKeypair()

  if (!keypair || !wallet) {
    return null
  }

  return (
    <Dialog open={state.isUpdateKeyModalOpen} title="Update key" size="lg">
      <PublicKey publicKey={keypair.publicKey} />
      <div className="px-[20px] pb-[20px]">
        <UpdateKeyForm keypair={keypair} wallet={wallet} />
      </div>
    </Dialog>
  )
}

type UpdateKeyFormProps = {
  keypair: KeyPair
  wallet: Wallet
}

function UpdateKeyForm({ keypair, wallet }: UpdateKeyFormProps) {
  const { actions, dispatch } = useGlobal()

  const { loading, update } = useKeypairUpdate(
    dispatch,
    actions,
    keypair?.publicKey,
    wallet?.name
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ meta: Meta[] }>({
    defaultValues: {
      meta: (keypair?.meta || []).filter((kp) => kp.key === 'name'),
    },
  })
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'meta',
  })

  const onSubmit = useCallback(
    (result: { meta: Meta[] }) => {
      update(result.meta)
    },
    [update]
  )

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      move(
        result.source.index,
        result.destination?.index ?? result.source.index
      )
    },
    [move]
  )

  const nameError = errors.meta?.[0]?.value

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="meta">
          {(provided) => (
            <>
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-[16px]"
              >
                <div>
                  <FormGroup
                    helperText={nameError?.message}
                    intent={nameError ? Intent.DANGER : Intent.NONE}
                  >
                    <label data-testid="metadata-key-0" htmlFor="meta-name">
                      Name
                    </label>
                    <Input
                      id="meta-name"
                      placeholder="value"
                      data-testid="metadata-value-0"
                      aria-invalid={nameError ? 'true' : 'false'}
                      {...register(`meta.0.value`, {
                        required: Validation.REQUIRED,
                      })}
                    />
                  </FormGroup>
                  {fields.length > 1 && (
                    <span className="invisible">Remove</span>
                  )}
                </div>
                {fields
                  .filter((kv) => kv.key !== 'name')
                  .map((field, index) => (
                    <Draggable
                      key={field.id}
                      draggableId={field.id}
                      index={index + 1}
                    >
                      {(provided) => {
                        return (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className={rowClass}>
                              <div
                                data-testid="metadata-row-indicator"
                                className={classnames(
                                  cellClass,
                                  'flex-col justify-center'
                                )}
                              >
                                {Array(3)
                                  .fill(0)
                                  .map((_, i) => (
                                    <span
                                      key={i}
                                      className={classnames(
                                        'w-[20px] h-[1px] bg-white my-[3px]'
                                      )}
                                    ></span>
                                  ))}
                              </div>
                              <FormGroup
                                helperText={
                                  errors.meta?.[index + 1]?.key?.message
                                }
                                intent={
                                  errors.meta?.[index + 1]?.key
                                    ? Intent.DANGER
                                    : Intent.NONE
                                }
                              >
                                <Input
                                  placeholder="key"
                                  data-testid="metadata-key"
                                  aria-invalid={
                                    errors.meta?.[index + 1]?.key
                                      ? 'true'
                                      : 'false'
                                  }
                                  {...register(`meta.${index + 1}.key`, {
                                    required: Validation.REQUIRED,
                                    validate: notName,
                                  })}
                                />
                              </FormGroup>
                              <FormGroup
                                helperText={
                                  errors.meta?.[index + 1]?.value?.message
                                }
                                intent={
                                  errors.meta?.[index + 1]?.value
                                    ? Intent.DANGER
                                    : Intent.NONE
                                }
                              >
                                <Input
                                  placeholder="value"
                                  data-testid="metadata-value"
                                  aria-invalid={
                                    errors.meta?.[index + 1]?.value
                                      ? 'true'
                                      : 'false'
                                  }
                                  {...register(`meta.${index + 1}.value`, {
                                    required: Validation.REQUIRED,
                                  })}
                                />
                              </FormGroup>
                              <button
                                data-testid="metadata-remove"
                                className={classnames(cellClass, 'underline')}
                                onClick={() => remove(index + 1)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        )
                      }}
                    </Draggable>
                  ))}
              </div>
              {provided.placeholder}
            </>
          )}
        </Droppable>
      </DragDropContext>
      <div className="my-[12px] hidden">
        <button
          data-testid="metadata-add"
          className="underline"
          onClick={() => append({ key: '', value: '' })}
        >
          Add metadata
        </button>
      </div>
      <ButtonGroup>
        <div className="flex-1">
          <button
            onClick={() =>
              dispatch({ type: 'SET_UPDATE_KEY_MODAL', open: false })
            }
            className="underline w-full"
          >
            Cancel
          </button>
        </div>
        <div className="flex-1">
          <Button
            data-testid="metadata-submit"
            disabled={loading}
            type="submit"
            fill={true}
          >
            Update
          </Button>
        </div>
      </ButtonGroup>
    </form>
  )
}
