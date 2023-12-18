import React from 'react';
import { Stack, Element, Button, Text } from '@codesandbox/components';
import { InputText } from 'app/components/dashboard/InputText';
import { PRICING_PLANS, PlanType } from 'app/constants';
import { useURLSearchParams } from 'app/hooks/useURLSearchParams';
import { StepProps } from '../types';
import { StepHeader } from '../StepHeader';
import { AnimatedStep } from '../elements';

export const PlanOptions: React.FC<StepProps> = ({
  onNextStep,
  onPrevStep,
  onDismiss,
  currentStep,
  numberOfSteps,
}) => {
  const { getQueryParam } = useURLSearchParams();
  const selectedPlan = getQueryParam('plan') as PlanType;

  const plan = PRICING_PLANS[selectedPlan];

  if (!plan) {
    onPrevStep();
    return null;
  }

  const handleSubmit = () => {
    // TODO: API Call to save the limit
    onNextStep();
  };

  return (
    <AnimatedStep>
      <Stack direction="vertical" gap={6} css={{ width: '450px' }}>
        <StepHeader
          onPrevStep={onPrevStep}
          onDismiss={onDismiss}
          currentStep={currentStep}
          numberOfSteps={numberOfSteps}
          title="Set a spending limit"
        />
        <Text>
          You will have <Text color="#fff">{plan.credits} credits</Text>{' '}
          included in your subscription. Above this, you can purchase on-demand
          credits at ${plan.additionalCreditsCost}/credit (500 credits for $
          {plan.additionalCreditsCost * 500}).
        </Text>
        <Text>
          Set a monthly spending limit for these on-demand credits, so that you
          can stay within your budget.
        </Text>
        <Text>You can change this limit at any time.</Text>
        <Stack gap={2} direction="vertical">
          <Text as="label" htmlFor="spending-limit" color="#fff">
            Monthly spending limit for on-demand credits
          </Text>
          <Text id="spending-limit-description">
            For the first two billing cycles, the maximum limit is $100. If you
            need a higher limit, contact us.
          </Text>
          <Element
            css={{
              position: 'relative',
            }}
          >
            <InputText
              label="Spending limit"
              aria-describedby="spending-limit-description"
              placeholder="100"
              id="spending-limit"
              name="spending-limit"
              required
              max={100}
              defaultValue={100}
              type="number"
              autoFocus
              hideLabel
              css={{ paddingLeft: '20px' }}
              onChange={() => {}}
            />
            <Text
              size={4}
              color="#fff"
              css={{ position: 'absolute', left: 9, top: 10 }}
            >
              $
            </Text>
          </Element>
        </Stack>
        <Button autoWidth size="large" onClick={handleSubmit}>
          Proceed to checkout
        </Button>
      </Stack>
    </AnimatedStep>
  );
};