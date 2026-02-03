/* =====================================================================================
 * Archivo: src/components/ExperienceTimeline/ExperienceTimeline.tsx
 * -------------------------------------------------------------------------------------
 * FIX TS ERROR:
 * - El error pasa porque motion(Box) NO acepta la prop `component` de MUI.
 * - Solución correcta: usar motion(Stack) directamente (con forwardRef) para que:
 *    1) Stack acepte `spacing`
 *    2) Framer Motion acepte `variants/initial/animate`
 *
 * ✅ MISMO NOMBRE: ExperienceTimeline
 * ✅ MISMAS interfaces públicas
 * ✅ Animación: cada hito se revela al entrar al viewport y se reinicia cuando la sección sale completa
 * ✅ Sin animaciones izquierda-derecha (solo fade + y leve)
 * ===================================================================================== */

import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion, useInView, type Variants } from "framer-motion";

export interface ExperienceTimelineItem {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
}

export interface ExperienceTimelineProps {
  items: ExperienceTimelineItem[];
  maxWidth?: "sm" | "md" | "lg" | "xl";
}

type Side = "left" | "right";
const getSideByIndex = (index: number): Side =>
  index % 2 === 0 ? "left" : "right";

/**
 * Motion wrapper para cada fila de la línea de tiempo.
 */
const MotionBox = motion(Box);

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

export function ExperienceTimeline({
  items,
  maxWidth = "lg",
}: ExperienceTimelineProps): React.ReactElement {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const sectionRef = React.useRef<HTMLElement | null>(null);
  const isSectionInView = useInView(sectionRef, {
    once: false,
    amount: 0.1,
  });

  const [visibleItems, setVisibleItems] = React.useState<
    Record<string, boolean>
  >({});
  const prevSectionInView = React.useRef(false);

  React.useEffect(() => {
    if (!isSectionInView && prevSectionInView.current) {
      setVisibleItems({});
    }

    prevSectionInView.current = isSectionInView;
  }, [isSectionInView]);

  const handleItemVisible = React.useCallback((id: string) => {
    setVisibleItems((prev) => {
      if (prev[id]) {
        return prev;
      }

      return { ...prev, [id]: true };
    });
  }, []);

  return (
    <Box
      component="section"
      aria-label="Línea de tiempo de experiencia"
      ref={sectionRef}
      sx={{
        py: { xs: 4, md: 6 },
        backgroundColor: "background.default",
      }}
    >
      <Container maxWidth={maxWidth}>
        <Box
          sx={{
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              bottom: 0,
              left: isMdUp ? "50%" : 16,
              transform: isMdUp ? "translateX(-50%)" : "none",
              width: "2px",
              bgcolor: "divider",
            },
          }}
        >
          <Stack spacing={{ xs: 4, md: 6 }} sx={{ position: "relative" }}>
            {items.map((item, index) => (
              <TimelineRow
                key={item.id}
                item={item}
                index={index}
                isMdUp={isMdUp}
                side={getSideByIndex(index)}
                onInView={handleItemVisible}
                isVisible={Boolean(visibleItems[item.id])}
              />
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function TimelineRow({
  item,
  index,
  isMdUp,
  side,
  onInView,
  isVisible,
}: {
  item: ExperienceTimelineItem;
  index: number;
  isMdUp: boolean;
  side: Side;
  onInView: (id: string) => void;
  isVisible: boolean;
}): React.ReactElement {
  const headerAlign: "left" | "right" = side === "left" ? "right" : "left";
  const cardAlign: "left" | "right" = side === "left" ? "left" : "right";

  const rowTransition = { duration: 0.35, ease: "easeOut" as const };

  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const isRowInView = useInView(rowRef, {
    once: false,
    amount: isMdUp ? 0.55 : 0.35,
    margin: "-15% 0px",
  });

  React.useEffect(() => {
    if (isRowInView) {
      onInView(item.id);
    }
  }, [isRowInView, item.id, onInView]);

  const motionState = isVisible ? "visible" : "hidden";

  if (isMdUp) {
    return (
      <MotionBox
        ref={rowRef}
        variants={itemVariants}
        initial="hidden"
        animate={motionState}
        transition={rowTransition}
        sx={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 64px 1fr",
          columnGap: 2,
          alignItems: "start",
        }}
        aria-label={`${item.company} - ${item.role}`}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {side === "left" ? (
            <TimelineHeader item={item} align={headerAlign} />
          ) : (
            <TimelineCard bullets={item.bullets} align={cardAlign} />
          )}
        </Box>

        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TimelineDotDesktop index={index} />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          {side === "left" ? (
            <TimelineCard bullets={item.bullets} align={cardAlign} />
          ) : (
            <TimelineHeader item={item} align={headerAlign} />
          )}
        </Box>
      </MotionBox>
    );
  }

  return (
    <MotionBox
      ref={rowRef}
      variants={itemVariants}
      initial="hidden"
      animate={motionState}
      transition={rowTransition}
      sx={{ position: "relative", pl: 5 }}
      aria-label={`${item.company} - ${item.role}`}
    >
      <TimelineDotMobile index={index} />

      <Stack spacing={2}>
        <TimelineHeader item={item} align="left" />
        <TimelineCard bullets={item.bullets} align="left" />
      </Stack>
    </MotionBox>
  );
}

function TimelineHeader({
  item,
  align,
}: {
  item: ExperienceTimelineItem;
  align: "left" | "right";
}): React.ReactElement {
  return (
    <Box sx={{ textAlign: align, maxWidth: 420 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
        {item.company}
      </Typography>

      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, color: "primary.main", mt: 0.5 }}
      >
        {item.role}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          display: "inline-block",
          mt: 0.75,
          fontWeight: 700,
          letterSpacing: 1.4,
          textTransform: "uppercase",
          color: "text.secondary",
        }}
      >
        {item.period}
      </Typography>
    </Box>
  );
}

function TimelineCard({
  bullets,
  align,
}: {
  bullets: string[];
  align: "left" | "right";
}): React.ReactElement {
  return (
    <Card
      elevation={0}
      sx={{
        width: "100%",
        maxWidth: 560,
        borderRadius: 2,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
        ml: align === "left" ? 0 : "auto",
        mr: align === "right" ? 0 : "auto",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <CardContent sx={{ p: 2.5 }}>
        <Stack
          component="ul"
          spacing={1.25}
          sx={{
            m: 0,
            pl: 2.5,
            color: "text.secondary",
            "& li": { lineHeight: 1.55 },
            "& li::marker": { color: "primary.main" },
          }}
        >
          {bullets.map((b, i) => (
            <Typography component="li" variant="body2" key={`${b}-${i}`}>
              {b}
            </Typography>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

function TimelineDotDesktop({ index }: { index: number }): React.ReactElement {
  return (
    <Box
      role="img"
      aria-label={`Hito ${index + 1}`}
      sx={{
        position: "relative",
        mt: 2,
        width: 12,
        height: 12,
        borderRadius: "50%",
        bgcolor: "primary.main",
        boxShadow: (theme) => `0 0 0 6px ${theme.palette.background.paper}`,
      }}
    />
  );
}

function TimelineDotMobile({ index }: { index: number }): React.ReactElement {
  return (
    <Box
      role="img"
      aria-label={`Hito ${index + 1}`}
      sx={{
        position: "absolute",
        left: 16,
        top: 18,
        transform: "translate(-50%, -50%)",
        width: 12,
        height: 12,
        borderRadius: "50%",
        bgcolor: "primary.main",
        boxShadow: (theme) => `0 0 0 6px ${theme.palette.background.paper}`,
      }}
    />
  );
}
