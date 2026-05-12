import type { Meta, StoryObj } from '@storybook/react-vite';
import type { FormEvent } from 'react';
import { vars } from '../../../styles';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Text } from '../../ui/Text';
import { Forms, type FormField } from './Forms';

const meta = {
  title: 'Components/Batch 2/Forms',
  component: Forms,
  parameters: {
    layout: 'padded',
  },
  args: {
    fields: [],
  },
} satisfies Meta<typeof Forms>;

export default meta;
type Story = StoryObj<typeof meta>;

const storySurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.comfortable,
} as const;

const wideSurfaceStyle = {
  display: 'grid',
  gap: vars.space[6],
  maxWidth: vars.font.measure.wide,
} as const;

function preventSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
}

const signInFields: FormField[] = [
  {
    id: 'email',
    node: <Input label="Email" name="email" placeholder="you@example.com" type="email" required />,
  },
  {
    id: 'password',
    node: <Input label="Password" name="password" placeholder="password" type="password" required />,
  },
];

const contactFields: FormField[] = [
  {
    id: 'name',
    node: <Input label="Name" name="name" placeholder="Ada Lovelace" required />,
  },
  {
    id: 'email',
    node: <Input label="Email" name="email" placeholder="ada@example.com" type="email" required />,
  },
  {
    id: 'message',
    fullWidth: true,
    node: (
      <Input
        label="Message"
        name="message"
        placeholder="Tell us what you are building."
        multiline
        rows={5}
        required
      />
    ),
  },
];

export const Default: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Sign in"
        description="A basic stacked form composed from Input and Button primitives."
        fields={signInFields}
        actions={<Button type="submit">Continue</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <section style={wideSurfaceStyle}>
      <Forms
        title="Contact request"
        description="Contact forms can use grid layout and full-width fields without becoming a contact section."
        fields={contactFields}
        layout="grid"
        actions={
          <>
            <Button type="submit">Send request</Button>
            <Button variant="ghost" type="reset">
              Clear
            </Button>
          </>
        }
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const InlineForm: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Inline signup"
        description="Inline forms wrap safely when space is tight."
        fields={[
          {
            id: 'inline-email',
            node: <Input label="Email" name="inline-email" placeholder="you@example.com" type="email" />,
          },
        ]}
        layout="inline"
        tone="subtle"
        actions={<Button type="submit">Subscribe</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const GridForm: Story = {
  render: () => (
    <section style={wideSurfaceStyle}>
      <Forms
        title="Profile details"
        fields={[
          { id: 'first-name', node: <Input label="First name" name="first-name" /> },
          { id: 'last-name', node: <Input label="Last name" name="last-name" /> },
          { id: 'role', node: <Input label="Role" name="role" /> },
          { id: 'company', node: <Input label="Company" name="company" /> },
          {
            id: 'bio',
            fullWidth: true,
            node: <Input label="Short bio" name="bio" multiline rows={4} />,
          },
        ]}
        layout="grid"
        tone="outline"
        actions={<Button type="submit">Save details</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Payment details"
        description="Form-level status complements field-level error messages."
        status={{
          variant: 'error',
          title: 'Review required fields',
          message: 'One or more fields need attention before this form can continue.',
        }}
        fields={[
          {
            id: 'billing-email',
            node: (
              <Input
                label="Billing email"
                name="billing-email"
                type="email"
                defaultValue="not-an-email"
                error="Enter a valid email address."
                required
              />
            ),
          },
          {
            id: 'billing-name',
            node: <Input label="Name on account" name="billing-name" error="Name is required." required />,
          },
        ]}
        actions={<Button type="submit">Try again</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const SuccessState: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Preferences"
        status={{
          variant: 'success',
          title: 'Saved',
          message: 'Your form changes were saved in this presentational state.',
        }}
        fields={[
          {
            id: 'success-email',
            node: <Input label="Notification email" name="success-email" defaultValue="team@example.com" />,
          },
        ]}
        actions={<Button type="submit">Save again</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const DisabledForm: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Disabled form"
        description="When rendered as a form, disabled wraps fields and actions in a disabled fieldset."
        fields={signInFields}
        actions={<Button type="submit">Unavailable</Button>}
        disabled
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const LoadingSubmit: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Submitting form"
        fields={[
          {
            id: 'loading-email',
            node: <Input label="Email" name="loading-email" defaultValue="team@example.com" type="email" />,
          },
        ]}
        actions={
          <Button loading type="submit">
            Sending
          </Button>
        }
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const WithHelperText: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Helper text"
        fields={[
          {
            id: 'helper-email',
            node: (
              <Input
                label="Work email"
                name="helper-email"
                helperText="Use the email address associated with your workspace. Helper text remains owned by the Input primitive."
                type="email"
              />
            ),
          },
        ]}
        actions={<Button type="submit">Continue</Button>}
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Request access"
        fields={[
          { id: 'footer-name', node: <Input label="Name" name="footer-name" /> },
          { id: 'footer-email', node: <Input label="Email" name="footer-email" type="email" /> },
        ]}
        actions={<Button type="submit">Request access</Button>}
        footer="By submitting this form, you agree to be contacted about this request."
        onSubmit={preventSubmit}
      />
    </section>
  ),
};

export const AccessibilityNotes: Story = {
  render: () => (
    <section style={storySurfaceStyle}>
      <Forms
        title="Accessibility contract"
        status={{
          variant: 'info',
          title: 'Form semantics',
          message: 'Labels, helper text, and errors are owned by Input. Form-level messaging uses Alert.',
        }}
        fields={signInFields.slice(0, 1)}
        actions={<Button type="submit">Submit</Button>}
        footer="This component does not perform validation or API submission."
        onSubmit={preventSubmit}
      />
      <Text tone="secondary">
        Forms compose Input, Button, Alert, and Text. Labels and field-level messages come from
        Input. Form-level status uses Alert. This component does not perform validation or API
        submission.
      </Text>
    </section>
  ),
};
