import React from 'react';
import { Badge, Stack, Text } from '@codesandbox/components';
import { getTemplateIcon } from '@codesandbox/common/lib/utils/getTemplateIcon';
import { TemplateFragment } from 'app/graphql/types';
import { VisuallyHidden } from 'reakit/VisuallyHidden';
import { useAppState } from 'app/overmind';
import { TemplateButton } from './elements';

interface TemplateCardProps {
  disabled?: boolean;
  template: TemplateFragment;
  onSelectTemplate: (template: TemplateFragment) => void;
  onOpenTemplate: (template: TemplateFragment) => void;
}

export const TemplateCard = ({
  disabled,
  template,
  onSelectTemplate,
  onOpenTemplate,
}: TemplateCardProps) => {
  const { isLoggedIn } = useAppState();
  const { UserIcon } = getTemplateIcon(
    template.iconUrl,
    template.sandbox?.source?.template
  );

  const sandboxTitle = template.sandbox?.title || template.sandbox?.alias;
  const isV2 = template.sandbox?.isV2;
  const teamName = template.sandbox?.collection?.team?.name;

  return (
    <TemplateButton
      title={sandboxTitle}
      type="button"
      onClick={evt => {
        if (disabled) {
          return;
        }

        if (evt.metaKey || evt.ctrlKey || !isLoggedIn) {
          onOpenTemplate(template);
        } else {
          onSelectTemplate(template);
        }
      }}
      onKeyDown={evt => {
        if (disabled) {
          return;
        }

        if (evt.key === 'Enter') {
          evt.preventDefault();
          if (evt.metaKey || evt.ctrlKey) {
            onOpenTemplate(template);
          } else {
            onSelectTemplate(template);
          }
        }
      }}
      disabled={disabled}
    >
      <Stack css={{ height: '100%' }} direction="vertical" gap={4}>
        <Stack
          css={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
        >
          <UserIcon />
          {isV2 && <Badge icon="cloud">Beta</Badge>}
        </Stack>
        <Stack direction="vertical" gap={1}>
          <Text
            css={{
              fontSize: '14px',
              fontWeight: 500,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {sandboxTitle}
          </Text>

          <Text size={2} css={{ color: '#999' }}>
            <VisuallyHidden>by </VisuallyHidden>
            {teamName || 'GitHub'}
          </Text>
        </Stack>
      </Stack>
    </TemplateButton>
  );
};