import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@garage/ui/components/ui/input-otp";

import { ShowcaseSection, Stack } from "../showcase";

export function InputOtpSection() {
  return (
    <ShowcaseSection
      id="input-otp"
      title="Input OTP"
      description="One-time-passcode input, 6 digits."
    >
      <Stack>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </Stack>
    </ShowcaseSection>
  );
}
