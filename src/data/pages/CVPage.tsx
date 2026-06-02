import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button } from "@mui/material";
import { useIsMobile } from "../../hooks/useIsMobile";

export default function CVPage() {
  const isMobile = useIsMobile();

  if (isMobile) {
    const pdfUrl = `${window.location.origin}/cv.pdf`;
    const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`;

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <iframe
          src={viewerUrl}
          title="CV Benjamin Guillemin"
          style={{
            width: "100%",
            flex: 1,
            border: "none",
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 1.5,
            borderTop: "1px solid #e0e0e0",
          }}
        >
          <Button
            variant="contained"
            href="/cv.pdf"
            download="Benjamin_Guillemin_CV.pdf"
            startIcon={<DownloadIcon />}
            disableElevation
            size="small"
            sx={{ fontWeight: 600 }}
          >
            Telecharger
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: 500 }}>
      <iframe
        src="/cv.pdf"
        title="CV Benjamin Guillemin"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          minHeight: 500,
        }}
      />
    </Box>
  );
}
