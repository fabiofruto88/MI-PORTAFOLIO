"use client";

import { Container, Link as MuiLink, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import SectionEyebrow from "@/components/common/SectionEyebrow";
import type { InfoPageContent } from "@/data/site";

const URL_PATTERN = /(https?:\/\/[^\s)]+)/g;
const EMAIL_PATTERN = /([\w.+-]+@[\w-]+\.[\w.]+)/g;

function renderRichText(text: string) {
  return text.split(URL_PATTERN).map((chunk, i) => {
    if (/^https?:\/\//.test(chunk)) {
      return (
        <MuiLink
          key={i}
          href={chunk}
          target="_blank"
          rel="noopener noreferrer"
        >
          {chunk}
        </MuiLink>
      );
    }
    return chunk.split(EMAIL_PATTERN).map((part, j) =>
      /^[\w.+-]+@[\w-]+\.[\w.]+$/.test(part) ? (
        <MuiLink key={`${i}-${j}`} href={`mailto:${part}`}>
          {part}
        </MuiLink>
      ) : (
        part
      ),
    );
  });
}

export default function InfoPage({ page }: { page: InfoPageContent }) {
  return (
    <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
      <Stack spacing={3}>
        <SectionEyebrow>Fabio Fruto</SectionEyebrow>
        <Typography variant="h1" sx={{ fontWeight: 700 }}>
          {page.title}
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1.125rem" }}>
          {page.intro}
        </Typography>
        {page.sections.map((section) => (
          <Stack key={section.heading} spacing={1.5}>
            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
              {section.heading}
            </Typography>
            {section.paragraphs.map((paragraph) => (
              <Typography
                key={paragraph}
                variant="body1"
                sx={{ color: "text.secondary" }}
              >
                {renderRichText(paragraph)}
              </Typography>
            ))}
          </Stack>
        ))}
        <MuiLink component={NextLink} href="/" underline="hover">
          ← Volver al inicio
        </MuiLink>
      </Stack>
    </Container>
  );
}
