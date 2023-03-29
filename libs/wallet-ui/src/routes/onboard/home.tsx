import { Button, Input } from '@vegaprotocol/ui-toolkit'
import { useCallback, useEffect, useState } from 'react'
import { Vega } from '../../components/icons'
import { Title } from '../../components/title'
import { useForm } from 'react-hook-form'
import { Validation } from '../../lib/form-validation'
import { FormGroup } from '../../components/form-group'
import { Intent } from '../../config/intent'
import { AppToaster } from '../../components/toaster'
import { useGlobal } from '../../contexts/global/global-context'
import { useNavigate } from 'react-router-dom'

export const OnboardHome = () => {
  const { service } = useGlobal()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<{ vegaHome: string }>({
    reValidateMode: 'onChange',
  })

  const [homeDirectory, setHomeDirectory] = useState<string>('')
  useEffect(() => {
    const getHomeDirectory = async () => {
      const vegaHome = await service.SuggestFairgroundFolder()
      setHomeDirectory(vegaHome)
      setValue('vegaHome', vegaHome)
    }
    getHomeDirectory()
  }, [service, setValue])

  const onSubmit = useCallback(
    async ({ vegaHome }: { vegaHome: string }) => {
      try {
        await service.InitialiseApp({ vegaHome })
        navigate('/onboard/start')
      } catch (err) {
        AppToaster.show({
          intent: Intent.DANGER,
          message: `${err}`,
        })
      }
    },
    [navigate, service]
  )

  if (!homeDirectory) {
    return null
  }

  return (
    <section className="m-auto text-center pt-10" data-testid="onboard-home">
      <Title className="m-0 mb-7 text-white">
        <Vega />
      </Title>
      <p>
        Looks like you are using a Fairground build of the wallet. We
        recommended that you use a different <code>VegaHome</code> directory as
        compatibility between versions is not yet guaranteed.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="pt-8 text-left">
        <FormGroup
          label="Vega Home Directory:"
          labelFor="vega-home"
          helperText={errors.vegaHome?.message}
          intent={errors.vegaHome?.message ? Intent.DANGER : Intent.NONE}
        >
          <Input
            id="vega-home"
            type="text"
            placeholder={homeDirectory}
            {...register('vegaHome', { required: Validation.REQUIRED })}
          />
        </FormGroup>
        <Button fill={true} variant="primary" type="submit">
          Continue
        </Button>
      </form>
    </section>
  )
}
