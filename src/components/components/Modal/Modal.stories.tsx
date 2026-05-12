import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ReactNode } from 'react';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Text } from '../../ui/Text';
import { Forms } from '../Forms';
import { Modal, type ModalSize } from './Modal';

const meta = {
  title: 'Components/Batch 2/Modal',
  component: Modal,
  parameters: {
    layout: 'padded',
  },
  args: {
    open: false,
    onOpenChange: () => undefined,
    title: 'Modal',
    children: 'Modal content',
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const storySurfaceStyle = {
  display: 'grid',
  gap: vars.space[4],
  maxWidth: vars.font.measure.comfortable,
} as const;

const wideSurfaceStyle = {
  display: 'grid',
  gap: vars.space[4],
  maxWidth: vars.font.measure.wide,
} as const;

const noteStyle = {
  display: 'grid',
  gap: vars.space[3],
  maxWidth: vars.font.measure.comfortable,
} as const;

function ModalDemo({
  triggerLabel = 'Open modal',
  title,
  description,
  children,
  footer,
  size = 'md',
  tone = 'default',
  closeOnEscape = true,
  closeOnBackdrop = true,
}: {
  triggerLabel?: string;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  tone?: 'default' | 'subtle';
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>{triggerLabel}</Button>
      <Modal
        open={open}
        onOpenChange={setOpen}
        title={title}
        description={description}
        footer={footer}
        size={size}
        tone={tone}
        closeOnEscape={closeOnEscape}
        closeOnBackdrop={closeOnBackdrop}
      >
        {children}
      </Modal>
    </>
  );
}

function SizedModalDemo() {
  const [openSize, setOpenSize] = useState<ModalSize | null>(null);
  const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

  return (
    <section style={wideSurfaceStyle}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: vars.space[3] }}>
        {sizes.map((size) => (
          <Button key={size} variant="secondary" onClick={() => setOpenSize(size)}>
            Open {size}
          </Button>
        ))}
      </div>
      {openSize ? (
        <Modal
          open
          onOpenChange={(nextOpen) => setOpenSize(nextOpen ? openSize : null)}
          title={`${openSize.toUpperCase()} modal`}
          description="Size variants keep the same dialog behavior while changing the surface width."
          size={openSize}
          footer={<Button onClick={() => setOpenSize(null)}>Close</Button>}
        >
          <Text as="p" variant="body" tone="secondary">
            This modal demonstrates the {openSize} size variant. Full size remains constrained to the
            viewport and keeps content scrollable inside the dialog body.
          </Text>
        </Modal>
      ) : null}
    </section>
  );
}

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Text as="p" variant="body" tone="secondary">
        Default modal with title, description, body copy, close button, and footer actions.
      </Text>
      <ModalDemo
        title="Review component changes"
        description="Use Modal for focused layered content without taking over route-level behavior."
        footer={
          <>
            <Button variant="ghost">Cancel</Button>
            <Button>Confirm</Button>
          </>
        }
      >
        <Text as="p" variant="body" tone="secondary">
          Modal content should be concise and action-oriented. Long workflows should stay outside this
          reusable component.
        </Text>
      </ModalDemo>
    </section>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <ModalDemo
        triggerLabel="Open confirmation"
        title="Archive this component?"
        description="Confirmation dialogs should make the consequence and available actions clear."
        footer={
          <>
            <Button variant="ghost">Cancel</Button>
            <Button>Archive</Button>
          </>
        }
      >
        <Text as="p" variant="body" tone="secondary">
          This is a presentational confirmation modal. It does not implement workflow, persistence, or
          route behavior.
        </Text>
      </ModalDemo>
    </section>
  ),
};

export const FormModal: Story = {
  render: () => (
    <section style={wideSurfaceStyle}>
      <ModalDemo
        triggerLabel="Open form modal"
        title="Update profile"
        description="Forms can be composed inside Modal without making Modal own validation or submission."
        size="lg"
      >
        <Forms
          title="Profile details"
          description="The Forms component owns form layout and status composition."
          fields={[
            { id: 'modal-name', node: <Input label="Name" name="modal-name" defaultValue="Ada" /> },
            {
              id: 'modal-email',
              node: <Input label="Email" name="modal-email" type="email" defaultValue="ada@example.com" />,
            },
            {
              id: 'modal-note',
              fullWidth: true,
              node: <Input label="Note" name="modal-note" multiline rows={4} />,
            },
          ]}
          layout="grid"
          actions={<Button type="submit">Save profile</Button>}
          onSubmit={(event) => event.preventDefault()}
        />
      </ModalDemo>
    </section>
  ),
};

export const LongContent: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <ModalDemo
        triggerLabel="Open long content"
        title="Scrollable release notes"
        description="Long modal body content scrolls inside the dialog surface."
        size="lg"
        footer={<Button>Done</Button>}
      >
        <div style={{ display: 'grid', gap: vars.space[3] }}>
          {Array.from({ length: 12 }, (_, index) => (
            <Text as="p" variant="body" tone="secondary" key={index}>
              Release note {index + 1}: long content remains readable and scrolls in the modal body
              while the header and footer stay structurally separate.
            </Text>
          ))}
        </div>
      </ModalDemo>
    </section>
  ),
};

export const Sizes: Story = {
  render: () => <SizedModalDemo />,
};

export const WithoutFooter: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <ModalDemo
        triggerLabel="Open body-only modal"
        title="Informational modal"
        description="Footer actions are optional."
        tone="subtle"
      >
        <Text as="p" variant="body" tone="secondary">
          Body-only modals still include a visible close button and accessible dialog semantics.
        </Text>
      </ModalDemo>
    </section>
  ),
};

export const CloseBehavior: Story = {
  render: () => (
    <section style={noteStyle}>
      <ModalDemo
        triggerLabel="Open strict close modal"
        title="Explicit close behavior"
        description="Escape and backdrop close can be disabled when the caller needs explicit action."
        closeOnEscape={false}
        closeOnBackdrop={false}
        footer={<Button>Close with the header button</Button>}
      >
        <Text as="p" variant="body" tone="secondary">
          This story disables Escape and backdrop close. The visible close button remains available.
        </Text>
      </ModalDemo>
      <Text as="p" variant="body" tone="secondary">
        Use this carefully. Most dialogs should keep Escape and backdrop close enabled unless the
        interaction requires an explicit decision.
      </Text>
    </section>
  ),
};

export const KeyboardFocusGuidance: Story = {
  render: () => (
    <section style={noteStyle}>
      <Text as="h3" variant="heading">
        Keyboard and focus guidance
      </Text>
      <Text as="p" variant="body" tone="secondary">
        Modal moves focus into the dialog when opened, traps Tab focus inside the dialog, closes on
        Escape when enabled, and returns focus when closed.
      </Text>
      <ModalDemo
        triggerLabel="Test focus behavior"
        title="Focus behavior"
        footer={<Button>Focusable footer action</Button>}
      >
        <Button variant="secondary">Focusable body action</Button>
      </ModalDemo>
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={noteStyle}>
      <Text as="h3" variant="heading">
        Accessibility notes
      </Text>
      <Text as="p" variant="body" tone="secondary">
        Modal uses role="dialog", aria-modal, aria-labelledby, and optional aria-describedby. Use
        Modal for focused layered content, not route-level flows.
      </Text>
    </section>
  ),
};
