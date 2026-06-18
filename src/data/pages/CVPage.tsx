import DownloadIcon from "@mui/icons-material/Download";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useElementWidth } from "../../hooks/useElementWidth";

// Same-origin worker so it loads under a strict CSP (`script-src 'self'`),
// instead of pdf.js' default CDN/blob worker.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

// A4 width in CSS pixels at 96dpi — the PDF's native page width.
const A4_WIDTH = 794;
const HORIZONTAL_PADDING = 32;

export default function CVPage() {
  const { ref, width } = useElementWidth<HTMLDivElement>();
  const [pageCount, setPageCount] = useState(0);

  const pageWidth = width > 0 ? Math.min(width - HORIZONTAL_PADDING, A4_WIDTH) : undefined;

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box
        ref={ref}
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          bgcolor: "#525659",
          py: 2,
        }}
      >
        <Document
          file="/cv.pdf"
          externalLinkTarget="_blank"
          externalLinkRel="noopener noreferrer"
          onLoadSuccess={({ numPages }) => setPageCount(numPages)}
        >
          {pageWidth
            ? Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                <Page key={pageNumber} pageNumber={pageNumber} width={pageWidth} />
              ))
            : null}
        </Document>
      </Box>
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
          Télécharger
        </Button>
      </Box>
    </Box>
  );
}
