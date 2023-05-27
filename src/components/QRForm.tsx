import { useMemo, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker'

import QRInput from './QRInput'
import { ZippedUrlAndQR } from '../types'
import { MAX_CODES } from '../config'
import { useSettings } from '../context/Settings.context'
import pluralize from '../utils/pluralize'
import { arrayRange } from '../utils/arrayRange'

const createQRWorker = createWorkerFactory(() => import('../utils/qr.worker'))

type QRFormProps = {
  onSubmit: (zippedValues: ZippedUrlAndQR) => void
}

export default function QRForm({ onSubmit }: QRFormProps) {
  const qrWokrer = useWorker(createQRWorker)
  const [range, setRange] = useState({ start: '1', end: '100' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { settings } = useSettings()

  const values = useMemo(() => arrayRange(range.start, range.end, 1), [range])

  const numberOfQRCodes = values.length
  const isInvalid = numberOfQRCodes < 1 || numberOfQRCodes > MAX_CODES

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!numberOfQRCodes) return

    setIsSubmitting(true)

    const qrCodeImages = await qrWokrer.generateImages(values, settings)

    const zippedUrlandQR = values.map((url, idx) => [url, qrCodeImages[idx]])

    onSubmit(zippedUrlandQR)
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <QRInput range={range} onChange={setRange} isInvalid={isInvalid} />
      <Button
        type='submit'
        isDisabled={isInvalid}
        colorScheme='green'
        size='lg'
        display='flex'
        mt='5'
        mx='auto'
        w='sm'
        maxW='full'
        isLoading={isSubmitting}
      >
        Generate {numberOfQRCodes} QR {pluralize('code', numberOfQRCodes)}{' '}
      </Button>
    </form>
  )
}
