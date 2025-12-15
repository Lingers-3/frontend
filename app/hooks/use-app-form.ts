import { Select } from '@radix-ui/react-select';
import { createFormHook } from '@tanstack/react-form'
import { createFormHookContexts } from "@tanstack/react-form";
import { PasswordField } from '~/components/form-components/PasswordField';
import { SubscribeButton } from '~/components/form-components/SubscribeButton';
import { TextArea } from '~/components/form-components/TextArea';
import { TextField } from '~/components/form-components/TextField';

export const { 
  fieldContext, 
  useFieldContext, 
  formContext, 
  useFormContext 
} = createFormHookContexts();

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
    PasswordField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
