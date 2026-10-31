import styles from "./scenes.module.css";

/**
 * Cuatro escenas mudas en bucle (6 s) que cuentan cada servicio como una
 * secuencia: qué hace el cliente de tu cliente y qué pasa después. Son SVG
 * con CSS; sin JS, sin vídeo, legibles aunque no animen.
 */

const T = { fontFamily: "var(--body)" } as const;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg className={styles.scene} viewBox="0 0 480 360" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

export function SceneWeb() {
  return (
    <Frame label="Un cliente busca en Google, encuentra tu página y te escribe por WhatsApp">
      <rect className={styles.win} x="20" y="20" width="440" height="320" rx="18" />
      <circle className={styles.dot} cx="44" cy="44" r="5" />
      <circle className={styles.dot} cx="62" cy="44" r="5" />
      <circle className={styles.dot} cx="80" cy="44" r="5" />
      <rect className={styles.field} x="110" y="34" width="320" height="22" rx="11" />
      <g className={styles.type}>
        <text x="126" y="50" fontSize="13" fill="currentColor" style={T}>
          pastelería cerca de mí
        </text>
      </g>
      <g className={styles.rise1}>
        <rect className={styles.card} x="44" y="84" width="392" height="86" rx="12" />
        <rect className={styles.bar} x="60" y="100" width="150" height="10" rx="5" />
        <rect className={styles.barSoft} x="60" y="120" width="300" height="8" rx="4" />
        <rect className={styles.barSoft} x="60" y="138" width="240" height="8" rx="4" />
      </g>
      <g className={styles.rise2}>
        <rect className={styles.card} x="44" y="184" width="392" height="96" rx="12" />
        <rect className={styles.bar} x="60" y="200" width="190" height="10" rx="5" />
        <rect className={styles.barSoft} x="60" y="220" width="310" height="8" rx="4" />
        <text x="60" y="262" fontSize="12" fontWeight="600" fill="currentColor" style={T}>
          Tu negocio · abierto hoy
        </text>
      </g>
      <g className={styles.pop}>
        <rect className={styles.cta} x="268" y="232" width="156" height="34" rx="17" />
        <text x="346" y="254" fontSize="13" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          Escribir por WhatsApp
        </text>
      </g>
      <g className={styles.bubble}>
        <rect className={styles.hit} x="190" y="294" width="246" height="34" rx="17" />
        <text x="313" y="316" fontSize="13" fontWeight="600" textAnchor="middle" className={styles.ctaText} style={T}>
          “Hola, quiero cotizar una torta”
        </text>
      </g>
    </Frame>
  );
}

export function SceneLanding() {
  return (
    <Frame label="Una página con una sola oferta: el visitante la ve, confía y reserva">
      <rect className={styles.win} x="110" y="20" width="260" height="320" rx="18" />
      <rect className={styles.bar} x="136" y="50" width="150" height="14" rx="7" />
      <rect className={styles.bar} x="136" y="72" width="110" height="14" rx="7" />
      <rect className={styles.barSoft} x="136" y="102" width="208" height="8" rx="4" />
      <rect className={styles.barSoft} x="136" y="118" width="170" height="8" rx="4" />
      <g className={styles.rise1}>
        <rect className={styles.card} x="136" y="146" width="208" height="76" rx="12" />
        <circle className={styles.hit} cx="164" cy="170" r="12" />
        <rect className={styles.bar} x="186" y="162" width="100" height="9" rx="4" />
        <rect className={styles.barSoft} x="186" y="178" width="140" height="7" rx="3" />
        <rect className={styles.barSoft} x="152" y="200" width="176" height="7" rx="3" />
      </g>
      <g className={styles.press}>
        <rect className={styles.cta} x="136" y="244" width="208" height="44" rx="22" />
        <text x="240" y="272" fontSize="15" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          Reservar mi cupo
        </text>
      </g>
      <g className={styles.cursor}>
        <path d="M0 0 L0 22 L6 17 L11 28 L16 26 L11 15 L19 15 Z" className={styles.ptr} />
      </g>
      <g className={styles.pop}>
        <rect className={styles.hit} x="316" y="296" width="140" height="34" rx="17" />
        <text x="386" y="318" fontSize="13" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          ✓ Reserva lista
        </text>
      </g>
    </Frame>
  );
}

export function SceneApp() {
  return (
    <Frame label="Una app en el celular del cliente: pide y recibe avisos de su pedido">
      <rect className={styles.win} x="150" y="14" width="180" height="332" rx="30" />
      <rect className={styles.field} x="214" y="26" width="52" height="8" rx="4" />
      <rect className={styles.bar} x="170" y="54" width="90" height="12" rx="6" />
      <g className={styles.rise1}>
        <rect className={styles.card} x="168" y="84" width="144" height="58" rx="12" />
        <circle className={styles.hit} cx="190" cy="113" r="12" />
        <rect className={styles.bar} x="210" y="102" width="82" height="8" rx="4" />
        <rect className={styles.barSoft} x="210" y="118" width="64" height="7" rx="3" />
      </g>
      <g className={styles.rise2}>
        <rect className={styles.card} x="168" y="154" width="144" height="58" rx="12" />
        <circle className={styles.hit} cx="190" cy="183" r="12" />
        <rect className={styles.bar} x="210" y="172" width="70" height="8" rx="4" />
        <rect className={styles.barSoft} x="210" y="188" width="82" height="7" rx="3" />
      </g>
      <g className={styles.press}>
        <rect className={styles.cta} x="168" y="296" width="144" height="38" rx="19" />
        <text x="240" y="320" fontSize="14" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          Pedir ahora
        </text>
      </g>
      <g className={styles.toast}>
        <rect className={styles.hit} x="120" y="226" width="240" height="46" rx="14" />
        <text x="240" y="247" fontSize="12" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          Tu pedido está en camino
        </text>
        <text x="240" y="263" fontSize="11" textAnchor="middle" className={styles.ctaText} style={T}>
          Te avisamos cuando llegue
        </text>
      </g>
    </Frame>
  );
}

export function SceneStore() {
  return (
    <Frame label="Una tienda en línea: el cliente elige, paga seguro y a ti te llega el pedido">
      <rect className={styles.win} x="20" y="20" width="440" height="320" rx="18" />
      <rect className={styles.bar} x="44" y="42" width="110" height="12" rx="6" />
      <g className={styles.cart}>
        <rect className={styles.card} x="372" y="34" width="64" height="26" rx="13" />
        <text x="404" y="52" fontSize="12" fontWeight="700" textAnchor="middle" fill="currentColor" style={T}>
          Carrito
        </text>
        <circle className={`${styles.badge} ${styles.hit}`} cx="436" cy="36" r="9" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className={i === 1 ? styles.pick : undefined}>
          <rect className={styles.card} x={44 + i * 134} y="84" width="120" height="130" rx="12" />
          <rect className={styles.field} x={56 + i * 134} y="96" width="96" height="62" rx="8" />
          <rect className={styles.bar} x={56 + i * 134} y="170" width="70" height="8" rx="4" />
          <rect className={styles.barSoft} x={56 + i * 134} y="186" width="48" height="7" rx="3" />
        </g>
      ))}
      <g className={styles.press}>
        <rect className={styles.cta} x="44" y="238" width="180" height="40" rx="20" />
        <text x="134" y="263" fontSize="14" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          Pagar de forma segura
        </text>
      </g>
      <g className={styles.pop}>
        <rect className={styles.hit} x="236" y="288" width="204" height="38" rx="19" />
        <text x="338" y="312" fontSize="13" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          ✓ Pedido nuevo para ti
        </text>
      </g>
    </Frame>
  );
}

export function SceneAuto() {
  return (
    <Frame label="Un mensaje llega, el asistente lo procesa y la tarea queda hecha">
      <path className={styles.rail} d="M130 180 H350" />
      <g className={styles.packetWrap}>
        <circle className={styles.hit} cx="130" cy="180" r="9" />
      </g>
      {[0, 1, 2].map((i) => (
        <g key={i} className={i === 0 ? styles.rise1 : i === 1 ? styles.rise2 : styles.rise1}>
          <rect className={styles.card} x="22" y={82 + i * 66} width="108" height="48" rx="14" />
          <rect className={styles.bar} x="36" y={96 + i * 66} width="60" height="8" rx="4" />
          <rect className={styles.barSoft} x="36" y={112 + i * 66} width="78" height="7" rx="3" />
        </g>
      ))}
      <rect className={styles.win} x="188" y="116" width="104" height="128" rx="26" />
      <g className={styles.spin}>
        <circle className={styles.ring} cx="240" cy="180" r="32" />
      </g>
      <circle className={styles.hit} cx="240" cy="180" r="14" />
      <text x="240" y="185" fontSize="12" fontWeight="800" textAnchor="middle" className={styles.ctaText} style={T}>
        IA
      </text>
      <rect className={styles.win} x="350" y="82" width="108" height="196" rx="16" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={styles.tick} style={{ animationDelay: `${i * 0.18}s` }}>
          <circle className={styles.hit} cx="376" cy={118 + i * 54} r="11" />
          <path d={`M370 ${118 + i * 54} l5 5 l9 -10`} className={styles.check} />
          <rect className={styles.bar} x="396" y={113 + i * 54} width="46" height="8" rx="4" />
        </g>
      ))}
      <g className={styles.pop}>
        <rect className={styles.hit} x="146" y="300" width="188" height="34" rx="17" />
        <text x="240" y="322" fontSize="13" fontWeight="700" textAnchor="middle" className={styles.ctaText} style={T}>
          ✓ 3 tareas resueltas
        </text>
      </g>
    </Frame>
  );
}

export const scenes = [SceneWeb, SceneLanding, SceneApp, SceneStore, SceneAuto];
