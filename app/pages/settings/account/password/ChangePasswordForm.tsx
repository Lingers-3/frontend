import { useEffect, useMemo, useState } from "react";
import { Form } from "react-router";
import z from "zod";
import { Button, buttonVariants } from "~/components/ui/button";
import { DialogFooter, DialogClose } from "~/components/ui/dialog";
import { usePassword } from "~/hooks/use-password";
import { cn } from "~/lib/utils";
import InputField, { type FieldName } from "./InputField";

const passwordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine(
        (pwd) => {
          const hasLower = /[a-z]/.test(pwd);
          const hasUpper = /[A-Z]/.test(pwd);
          const hasNumber = /[0-9]/.test(pwd);
          const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pwd);
          const count = [hasLower, hasUpper, hasNumber, hasSpecial].filter(
            Boolean
          ).length;
          return count >= 3;
        },
        {
          message:
            "Password must include at least 3 of the following: lowercase, uppercase, numbers, special characters",
        }
      ),
    repeatPassword: z.string(),
  })
  .refine((d) => d.newPassword === d.repeatPassword, {
    path: ["repeatPassword"],
    message: "Passwords do not match",
  });

type Errors = {
  newPassword?: string;
  repeatPassword?: string;
  backend?: string;
  success?: string;
};

type PwdReqs = {
  length: boolean;
  lower: boolean;
  upper: boolean;
  number: boolean;
  special: boolean;
};

export default function ChangePasswordForm(props: {
  open: boolean;
  onClose?: () => void;
}) {
  const { open, onClose } = props;

  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [touched, setTouched] = useState<{ [K in keyof Errors]?: boolean }>({});
  const [errors, setErrors] = useState<Errors>({});
  const [pwdReqs, setPwdReqs] = useState<PwdReqs>({
    length: false,
    lower: false,
    upper: false,
    number: false,
    special: false,
  });

  const { mutateAsync, isPending } = usePassword();

  function computeReqs(pwd: string): PwdReqs {
    return {
      length: pwd.length >= 8,
      lower: /[a-z]/.test(pwd),
      upper: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]/.test(pwd),
    };
  }

  const categoriesSatisfied = useMemo(
    () =>
      [pwdReqs.lower, pwdReqs.upper, pwdReqs.number, pwdReqs.special].filter(
        Boolean
      ).length,
    [pwdReqs]
  );
  const hasAnyFailingReq = !pwdReqs.length || categoriesSatisfied < 3;

  function validateField(field: FieldName) {
    if (field === "newPassword") {
      const reqs = computeReqs(newPassword);
      setPwdReqs(reqs);
      setErrors((e) => ({ ...e, newPassword: undefined }));
    } else {
      if (!repeatPassword) {
        setErrors((e) => ({
          ...e,
          repeatPassword: "Please repeat the password",
        }));
        return;
      }
      setErrors((e) => ({
        ...e,
        repeatPassword:
          newPassword === repeatPassword ? undefined : "Passwords do not match",
      }));
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const parsed = passwordSchema.safeParse({ newPassword, repeatPassword });
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as string | undefined;
        if (key === "newPassword") {
          fieldErrors.newPassword ??= issue.message;
        }
        if (key === "repeatPassword")
          fieldErrors.repeatPassword ??= issue.message;
      }
      if (
        parsed.error.issues.length &&
        parsed.error.issues.every((i) => i.path.length === 0)
      ) {
        fieldErrors.backend = parsed.error.issues
          .map((i) => i.message)
          .join(", ");
      }
      setErrors((prev) => ({ ...prev, ...fieldErrors }));
      setPwdReqs(computeReqs(newPassword));
      return;
    }

    try {
      const res = await mutateAsync({ newPassword });
      if (res.ok === true) {
        setErrors({
          success: res.value?.message ?? "Password updated successfully",
        });

        resetFields();
        onClose?.();
      } else if (res.ok === false) {
        setErrors({
          backend: res.error?.message ?? "Failed to change password",
        });
      } else if ((res as any)?.message) {
        setErrors({
          success: (res as any).message ?? "Password updated successfully",
        });
        resetFields();
        onClose?.();
      } else {
        setErrors({
          backend: "An unknown response was returned from the password API.",
        });
      }
    } catch (err: any) {
      const msg = err?.message ?? "An unexpected error occurred.";
      setErrors({ backend: msg });
    }
  }

  function resetFields() {
    setNewPassword("");
    setRepeatPassword("");
    setTouched({});
    setPwdReqs({
      length: false,
      lower: false,
      upper: false,
      number: false,
      special: false,
    });
    setErrors({});
  }

  useEffect(() => {
    if (!open) resetFields();
  }, [open]);

  return (
    <Form method="post" onSubmit={onSubmit} className="px-4 pb-4">
      <div className="flex flex-col gap-3">
        <InputField
          field="newPassword"
          label="New password"
          value={newPassword}
          onChange={(v) => {
            setNewPassword(v);
            setPwdReqs(computeReqs(v));
          }}
          onBlur={() => {
            setTouched((t) => ({ ...t, newPassword: true }));
            validateField("newPassword");
          }}
          touched={touched.newPassword}
          error={errors.newPassword}
          placeholder="Enter new password"
        />

        {touched.newPassword && hasAnyFailingReq ? (
          <ul className="mt-1 space-y-1">
            <li
              className={cn(
                "flex items-center text-sm gap-2",
                pwdReqs.length ? "text-neutral-400" : "text-red-500"
              )}
            >
              <span className="w-4 text-xs">{pwdReqs.length ? "✓" : "•"}</span>
              At least 8 characters
            </li>

            <li
              className={cn(
                "flex items-center text-sm gap-2",
                pwdReqs.lower ? "text-neutral-400" : "text-red-500"
              )}
            >
              <span className="w-4 text-xs">{pwdReqs.lower ? "✓" : "•"}</span>
              Lower case letters (a–z)
            </li>

            <li
              className={cn(
                "flex items-center text-sm gap-2",
                pwdReqs.upper ? "text-neutral-400" : "text-red-500"
              )}
            >
              <span className="w-4 text-xs">{pwdReqs.upper ? "✓" : "•"}</span>
              Upper case letters (A–Z)
            </li>

            <li
              className={cn(
                "flex items-center text-sm gap-2",
                pwdReqs.number ? "text-neutral-400" : "text-red-500"
              )}
            >
              <span className="w-4 text-xs">{pwdReqs.number ? "✓" : "•"}</span>
              Numbers (0–9)
            </li>

            <li
              className={cn(
                "flex items-center text-sm gap-2",
                pwdReqs.special ? "text-neutral-400" : "text-red-500"
              )}
            >
              <span className="w-4 text-xs">{pwdReqs.special ? "✓" : "•"}</span>
              Special characters (e.g. !@#$%^&*)
            </li>

            <p className="text-xs text-dracula-text-secondary mt-1">
              {categoriesSatisfied}/4 categories satisfied — at least 3
              required.
            </p>
          </ul>
        ) : null}

        <InputField
          field="repeatPassword"
          label="Repeat new password"
          value={repeatPassword}
          onChange={(v) => setRepeatPassword(v)}
          onBlur={() => {
            setTouched((t) => ({ ...t, repeatPassword: true }));
            validateField("repeatPassword");
          }}
          touched={touched.repeatPassword}
          error={errors.repeatPassword}
          placeholder="Repeat password"
        />

        {errors.backend ? (
          <div className="text-sm text-red-500 mt-1">{errors.backend}</div>
        ) : errors.success ? (
          <div className="text-sm text-green-400 mt-1">{errors.success}</div>
        ) : null}
      </div>

      <DialogFooter className="mt-4 flex items-center justify-between gap-2">
        <DialogClose asChild>
          <Button variant="outline" className="px-4">
            Cancel
          </Button>
        </DialogClose>

        <button
          type="submit"
          className={cn(
            buttonVariants({ variant: "default" }),
            "px-4 rounded-md"
          )}
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Change password"}
        </button>
      </DialogFooter>
    </Form>
  );
}
