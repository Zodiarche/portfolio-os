import { Box, Button, Divider, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import {
  COUNTER_ANNOUNCE_DELAY_MS,
  MESSAGE_COUNTER_THRESHOLD,
  MESSAGE_MAX_LENGTH,
} from "../../constants/contact";
import { useContactForm } from "../../hooks/useContactForm";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { formatCharacterCount } from "../../utils/formatCharacterCount";

/** Floor for the message field when the window is too short to give it real room. */
const MESSAGE_FIELD_MIN_HEIGHT = 120;

/** Holds the message field at ~78 characters per line, under the WCAG 1.4.8 cap of 80. */
const CONTENT_MAX_WIDTH = "72ch";

/** Ties the message field to the hidden hint that states its limit. */
const MESSAGE_HINT_ID = "contact-message-hint";

const contactLinks = [
  {
    label: "gitlab.com/Zodiarche",
    href: "https://gitlab.com/Zodiarche",
  },
  {
    label: "github.com/Zodiarche",
    href: "https://github.com/Zodiarche",
  },
  {
    label: "linkedin.com/in/benjamin-guillemin",
    href: "https://www.linkedin.com/in/benjamin-guillemin",
  },
];

export default function ContactPage() {
  const theme = useTheme();
  const accent = theme.palette.primary.main;

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 1.5,
      bgcolor: "#fafbfc",
      // Focus must not paint over the error state: an overflowing field stays red.
      "&.Mui-focused:not(.Mui-error) .MuiOutlinedInput-notchedOutline": {
        borderColor: accent,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: accent,
    },
  };
  const contentColumnSx = { width: "100%", maxWidth: CONTENT_MAX_WIDTH, mx: "auto" };
  const { formData, sent, sending, error, updateField, handleSubmit, reset } = useContactForm();

  const messageLength = formData.message.length;
  const isMessageOverLimit = messageLength > MESSAGE_MAX_LENGTH;
  const showMessageCounter = messageLength >= MESSAGE_COUNTER_THRESHOLD;
  const counterMessage = formatCharacterCount(messageLength, MESSAGE_MAX_LENGTH);
  const announcedCounterMessage = useDebouncedValue(
    showMessageCounter ? counterMessage : "",
    COUNTER_ANNOUNCE_DELAY_MS,
  );

  if (sent) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
          px: 4,
        }}
      >
        <Box sx={{ fontSize: 56 }}>✅</Box>
        <Typography variant="h5" fontWeight={600}>
          Message envoyé !
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
          Merci pour votre message. Je vous répondrai dans les plus brefs délais.
        </Typography>
        <Button variant="outlined" size="small" onClick={reset} sx={{ mt: 1 }}>
          Envoyer un autre message
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ ...contentColumnSx, px: 3, pt: 2.5, pb: 1.5 }}>
        <Typography variant="h5" fontWeight={700}>
          Me contacter
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Une question, une proposition, un projet ? N'hésitez pas.
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={2}
        sx={{ ...contentColumnSx, px: 3, pb: 1.5, flexWrap: "wrap", gap: 1 }}
      >
        {contactLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener"
            underline="hover"
            sx={{ fontSize: "0.8rem", color: accent, fontWeight: 500 }}
          >
            {link.label}
          </Link>
        ))}
      </Stack>

      <Divider />

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          ...contentColumnSx,
          flex: 1,
          overflow: "auto",
          px: 3,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        {/* Honeypot: hidden from users and assistive tech; bots that fill it are dropped server-side. */}
        <input
          type="text"
          name="gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={formData.gotcha}
          onChange={(event) => updateField("gotcha", event.target.value)}
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            padding: 0,
            margin: -1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            border: 0,
          }}
        />

        <Stack direction="row" spacing={2}>
          <TextField
            label="Nom"
            size="small"
            fullWidth
            value={formData.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
            sx={fieldSx}
          />
          <TextField
            label="Email"
            type="email"
            size="small"
            fullWidth
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
            sx={fieldSx}
          />
        </Stack>

        <TextField
          label="Objet"
          size="small"
          fullWidth
          value={formData.subject}
          onChange={(event) => updateField("subject", event.target.value)}
          required
          sx={fieldSx}
        />

        <TextField
          label="Message"
          multiline
          fullWidth
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          error={isMessageOverLimit}
          // A plain <textarea> instead of MUI's default: `multiline` alone renders a
          // TextareaAutosize, which writes an inline pixel height and would pin the
          // text area to its row count while the outlined box stretches to fill the
          // window. Sizing the element from CSS keeps the box and the writable area
          // the same thing.
          InputProps={{ inputComponent: "textarea" }}
          inputProps={{ "aria-describedby": MESSAGE_HINT_ID }}
          sx={{
            ...fieldSx,
            flex: 1,
            minHeight: MESSAGE_FIELD_MIN_HEIGHT,
            "& .MuiOutlinedInput-root": {
              ...fieldSx["& .MuiOutlinedInput-root"],
              height: "100%",
              alignItems: "stretch",
            },
            "& .MuiOutlinedInput-input": {
              height: "100%",
              overflow: "auto",
            },
          }}
        />

        {/* Read out when the field takes focus, so the limit is known before typing. */}
        <Box component="span" id={MESSAGE_HINT_ID} sx={visuallyHidden}>
          Vous pouvez saisir jusqu'à {MESSAGE_MAX_LENGTH} caractères.
        </Box>

        {/* Announced once typing stops; the visible counter is hidden from screen readers. */}
        <Box component="span" aria-live="polite" sx={visuallyHidden}>
          {announcedCounterMessage}
        </Box>

        {error && (
          <Typography variant="body2" sx={{ color: "error.main" }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 2 }}>
          {showMessageCounter && (
            <Typography
              aria-hidden
              variant="caption"
              sx={{ color: isMessageOverLimit ? "error.main" : "text.secondary" }}
            >
              {counterMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={sending}
            disableElevation
            sx={{ fontWeight: 600, px: 4 }}
          >
            {sending ? "Envoi…" : "Envoyer"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
