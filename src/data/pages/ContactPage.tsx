import { Box, Button, Divider, Link, Stack, TextField, Typography, useTheme } from "@mui/material";
import { useContactForm } from "../../hooks/useContactForm";

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
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: accent,
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: accent,
    },
  };
  const { formData, sent, sending, error, updateField, handleSubmit, reset } = useContactForm();

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
      <Box sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
        <Typography variant="h5" fontWeight={700}>
          Me contacter
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Une question, une proposition, un projet ? N'hésitez pas.
        </Typography>
      </Box>

      <Stack direction="row" spacing={2} sx={{ px: 3, pb: 1.5, flexWrap: "wrap", gap: 1 }}>
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
          rows={5}
          fullWidth
          value={formData.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
          sx={{
            ...fieldSx,
            flex: 1,
            "& .MuiOutlinedInput-root": {
              ...fieldSx["& .MuiOutlinedInput-root"],
              height: "100%",
              alignItems: "flex-start",
            },
          }}
        />

        {error && (
          <Typography variant="body2" sx={{ color: "error.main" }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
