import { Button, Input } from '@vegaprotocol/ui-toolkit'
import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Validation } from '../../lib/form-validation'
import { FormGroup } from '../../components/form-group'
import { Intent } from '../../config/intent'
import { AppToaster } from '../../components/toaster'
import { useGlobal } from '../../contexts/global/global-context'
import { useNavigate } from 'react-router-dom'
import { Paths } from '..'
import { OnboardingPage } from '../../components/page'

export const OnboardHome = () => {
  const { service, client, actions, features, dispatch } = useGlobal()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ vegaHome: string }>({
    reValidateMode: 'onChange',
  })

  const [VEGA_HOME, setHomeDirectory] = useState<string>('')
  useEffect(() => {
    const getHomeDirectory = async () => {
      const FAIRGROUND_VEGA_HOME = await service.SuggestFairgroundFolder()
      setHomeDirectory(FAIRGROUND_VEGA_HOME)
      setValue('vegaHome', FAIRGROUND_VEGA_HOME)
    }
    getHomeDirectory()
  }, [service, setValue])

  const onSubmit = useCallback(
    async ({ vegaHome }: { vegaHome: string }) => {
      try {
        await service.InitialiseApp({ vegaHome })

        const { wallets } = await client.ListWallets()
        if (wallets.length > 0) {
          /**
           * If wallet(s) are available inside the chosen VEGA_HOME directory
           * then it's not necessary to go through the onboarding process.
           */
          await dispatch(
            actions.completeOnboardAction(features.NETWORK_MODE, () =>
              navigate(Paths.Home)
            )
          )

          return
        }

        navigate(Paths.Onboard.Start)
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`,
        })
      }
    },
    [actions, client, dispatch, features.NETWORK_MODE, navigate, service]
  )

  if (!VEGA_HOME) {
    return null
  }

  return (
    <OnboardingPage title="Before you start">
      <p className="text-base pb-8 text-left">
        Looks like you are using a Fairground build of the wallet. We recommend
        that you use a different wallet directory as compatibility between
        versions is not guaranteed.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup
          className="text-left"
          label="Wallet Directory:"
          labelFor="vega-home"
          helperText={errors.vegaHome?.message}
          intent={errors.vegaHome?.message ? Intent.DANGER : Intent.NONE}
        >
          <Input
            id="vega-home"
            type="text"
            placeholder={VEGA_HOME}
            {...register('vegaHome', { required: Validation.REQUIRED })}
          />
        </FormGroup>
        <Button variant="primary" type="submit">
          Continue
        </Button>
      </form>
    </OnboardingPage>
  )
}
