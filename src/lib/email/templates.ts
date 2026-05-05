import "server-only";

import { siteConfig } from "@/config/site";

interface WelcomeTemplateInput {
  name: string;
  appUrl: string;
}

interface VerifyEmailTemplateInput {
  confirmUrl: string;
}

interface ResetPasswordTemplateInput {
  resetUrl: string;
}

/**
 * Plain-HTML email templates. Keep them ugly but functional — Gmail
 * strips most CSS, and tracking pixel/link rewriting from your sender
 * domain matters more than aesthetics.
 *
 * For richer templates use `react-email` and render to string here.
 */
export function welcomeEmail({ name, appUrl }: WelcomeTemplateInput): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `Welcome to ${siteConfig.name}`,
    html: `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px auto;">
  <h1 style="font-size:20px;">Welcome, ${escapeHtml(name)}.</h1>
  <p>Thanks for signing up to ${escapeHtml(siteConfig.name)}.</p>
  <p><a href="${appUrl}/dashboard" style="display:inline-block;background:#000;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Open dashboard</a></p>
  <p style="color:#666;font-size:12px;margin-top:32px;">If you didn't sign up, ignore this email.</p>
</body></html>`,
    text: `Welcome, ${name}.\n\nThanks for signing up to ${siteConfig.name}.\n\nOpen dashboard: ${appUrl}/dashboard\n\nIf you didn't sign up, ignore this email.`,
  };
}

export function verifyEmailTemplate({ confirmUrl }: VerifyEmailTemplateInput): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `Confirm your email — ${siteConfig.name}`,
    html: `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px auto;">
  <h1 style="font-size:20px;">Confirm your email address</h1>
  <p>Click the button below to verify your email and activate your ${escapeHtml(siteConfig.name)} account.</p>
  <p><a href="${confirmUrl}" style="display:inline-block;background:#000;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Confirm email</a></p>
  <p style="color:#666;font-size:12px;">This link expires in 24 hours. If you didn't create an account, ignore this email.</p>
  <p style="color:#666;font-size:12px;margin-top:8px;">Or copy and paste this URL: ${confirmUrl}</p>
</body></html>`,
    text: `Confirm your email address.\n\nClick the link below to verify your email:\n${confirmUrl}\n\nThis link expires in 24 hours.\nIf you didn't create an account, ignore this email.`,
  };
}

export function resetPasswordTemplate({ resetUrl }: ResetPasswordTemplateInput): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `Reset your password — ${siteConfig.name}`,
    html: `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px auto;">
  <h1 style="font-size:20px;">Reset your password</h1>
  <p>We received a request to reset the password for your ${escapeHtml(siteConfig.name)} account.</p>
  <p><a href="${resetUrl}" style="display:inline-block;background:#000;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Reset password</a></p>
  <p style="color:#666;font-size:12px;">This link expires in 1 hour. If you didn't request a password reset, ignore this email — your password won't change.</p>
  <p style="color:#666;font-size:12px;margin-top:8px;">Or copy and paste this URL: ${resetUrl}</p>
</body></html>`,
    text: `Reset your password.\n\nClick the link below to reset your password:\n${resetUrl}\n\nThis link expires in 1 hour.\nIf you didn't request a password reset, ignore this email.`,
  };
}

interface OrgInviteTemplateInput {
  inviterName: string;
  orgName: string;
  acceptUrl: string;
}

export function orgInviteEmail({ inviterName, orgName, acceptUrl }: OrgInviteTemplateInput): {
  subject: string;
  html: string;
  text: string;
} {
  return {
    subject: `${escapeHtml(inviterName)} invited you to ${escapeHtml(orgName)}`,
    html: `<!doctype html>
<html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#111;max-width:560px;margin:24px auto;">
  <h1 style="font-size:20px;">You've been invited to ${escapeHtml(orgName)}</h1>
  <p>${escapeHtml(inviterName)} has invited you to join <strong>${escapeHtml(orgName)}</strong>.</p>
  <p><a href="${acceptUrl}" style="display:inline-block;background:#000;color:#fff;padding:10px 16px;border-radius:6px;text-decoration:none;">Accept invitation</a></p>
  <p style="color:#666;font-size:12px;">This invitation expires in 7 days. If you weren't expecting this, ignore it.</p>
  <p style="color:#666;font-size:12px;margin-top:8px;">Or copy and paste this URL: ${acceptUrl}</p>
</body></html>`,
    text: `You've been invited to ${orgName}.\n\n${inviterName} has invited you to join ${orgName}.\n\nAccept the invitation: ${acceptUrl}\n\nThis invitation expires in 7 days.`,
  };
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    if (c === "&") return "&amp;";
    if (c === "<") return "&lt;";
    if (c === ">") return "&gt;";
    if (c === '"') return "&quot;";
    return "&#39;";
  });
}
