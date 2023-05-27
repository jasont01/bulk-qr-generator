import {
  FormControl,
  FormControlProps,
  Stack,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

interface Range {
  start: string
  end: string
}

type QRInputProps = {
  range: Range
  onChange: (value: Range) => void
} & Omit<FormControlProps, 'onChange'>

export default function QRInput({
  range,
  onChange,
  isInvalid,
  ...props
}: QRInputProps) {
  const setStart = (value: string) => {
    onChange({ ...range, start: value })
  }

  const setEnd = (value: string) => {
    onChange({ ...range, end: value })
  }

  return (
    <FormControl isInvalid={isInvalid} {...props}>
      <Stack shouldWrapChildren direction='row'>
        <InputGroup>
          <InputLeftAddon children='begin' />

          <NumberInput
            defaultValue={1}
            min={1}
            maxW={32}
            clampValueOnBlur={false}
            onChange={setStart}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>

        <InputGroup>
          <InputLeftAddon children='end' />
          <NumberInput
            defaultValue={100}
            max={99999}
            maxW={32}
            clampValueOnBlur={false}
            onChange={setEnd}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </Stack>
    </FormControl>
  )
}
