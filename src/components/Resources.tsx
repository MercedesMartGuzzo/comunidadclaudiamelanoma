'use client';
import { motion } from 'framer-motion';
import {
  BookOpenText,
  Search,
  Ruler,
  Microscope,
  FlaskConical,
  Tablets,
  Pill,
  Earth,
  Sprout,
  HandHeart,
} from 'lucide-react';

export default function ResourcesPage() {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <div className="mb-12">
        <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
          Biblioteca clínica CCM
        </p>

        <h1
          className="font-inconsolata text-4xl sm:text-5xl font-bold text-[#003C43] mb-4"
          style={{ letterSpacing: '-0.02em' }}
        >
          Recursos sobre Melanoma
        </h1>

        <p className="text-[#181c1d]/70 text-lg font-noto-sans max-w-2xl leading-relaxed">
          Información clínica, prevención, diagnóstico, estadísticas y
          tratamientos actuales organizados en una biblioteca visual y educativa.
        </p>
      </div>

      {/* HERO BANNER */}
      <section className="bg-white rounded-2xl p-8 mb-14 border border-[rgba(0,60,67,0.06)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">

          <div className="max-w-2xl">
            <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
              detección temprana
            </span>

            <h2
              className="font-inconsolata text-2xl sm:text-3xl font-bold text-[#003C43] mb-4"
              style={{ letterSpacing: '-0.02em' }}
            >
              La detección temprana salva vidas
            </h2>

            <p className="text-[#181c1d]/75 font-noto-sans leading-relaxed mb-6">
              Cuando el melanoma se detecta tempranamente, la tasa de
              supervivencia a 5 años supera el 99%. El autoexamen mensual y la
              consulta dermatológica son fundamentales.
            </p>

            <div className="flex flex-wrap gap-3">
              {[
                'Autoexamen mensual',
                'Protección UV',
                'Consulta dermatológica',
              ].map((item) => (
                <span
                  key={item}
                  className="text-[0.7rem] font-inconsolata font-bold uppercase tracking-wider text-[#003C43] bg-[#f6fafa] border border-[rgba(0,60,67,0.08)] px-3 py-2 rounded-full"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

  

        </div>
      </section>

      {/* GRID PRINCIPAL */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

        <article className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow">

          <BookOpenText className="w-8 h-8 text-[#003C43] mb-5" />

          <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            definición
          </span>

          <h2 className="font-inconsolata text-2xl font-bold text-[#003C43] mb-5">
            ¿Qué es el Melanoma?
          </h2>

          <div className="flex flex-col gap-6 text-sm text-[#181c1d]/75 leading-relaxed font-noto-sans">

            <p>
              El melanoma es un tumor maligno originado en los melanocitos,
              células encargadas de producir melanina, el pigmento responsable
              del color de la piel, cabello y ojos.
            </p>

            <p>
              Aunque representa un porcentaje menor de los cánceres de piel,
              es considerado el tipo más agresivo debido a su elevada capacidad
              metastásica y rápida diseminación hacia ganglios linfáticos y
              órganos internos.
            </p>

            <div className="bg-[#f6fafa] rounded-xl p-5 border border-[rgba(0,60,67,0.05)]">

              <p className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43] mb-4">
                Origen celular
              </p>

              <div className="flex flex-col gap-3 text-[13px] text-[#181c1d]/70">

                <p>
                  Los melanocitos se encuentran principalmente en la epidermis,
                  especialmente en la capa basal.
                </p>

                <p>
                  Cuando sufren mutaciones genéticas, comienzan a proliferar
                  de manera descontrolada formando lesiones malignas.
                </p>

              </div>

            </div>

            <div className="grid grid-cols-2 gap-4">

              {[
                ['90%', 'de los melanomas se originan en la piel'],
                ['50%', 'relacionados con mutación BRAF'],
                ['UV', 'principal factor ambiental'],
                ['4', 'subtipos histológicos principales'],
              ].map(([n, d]) => (
                <div
                  key={d}
                  className="bg-[#f6fafa] rounded-xl p-4 border border-[rgba(0,60,67,0.05)]"
                >
                  <p className="font-inconsolata text-xl sm:text-2xl font-bold text-[#003C43] mb-1">
                    {n}
                  </p>

                  <p className="text-[11px] uppercase tracking-wide text-[#181c1d]/55 leading-snug">
                    {d}
                  </p>
                </div>
              ))}

            </div>

            <div className="border border-[rgba(0,60,67,0.06)] rounded-xl overflow-hidden">

              <div className="bg-[#003C43] px-5 py-3">
                <p className="font-inconsolata text-sm font-bold uppercase tracking-wide text-[#E3FEF7]">
                  Principales subtipos
                </p>
              </div>

              <div className="divide-y divide-[rgba(0,60,67,0.06)]">

                {[
                  [
                    'Melanoma de extensión superficial',
                    'Es el subtipo más frecuente. Crece inicialmente de manera horizontal sobre la piel.',
                    '70%'
                  ],
                  [
                    'Melanoma nodular',
                    'Presenta crecimiento vertical rápido y mayor agresividad clínica.',
                    '15%'
                  ],
                  [
                    'Lentigo maligno melanoma',
                    'Frecuente en adultos mayores y zonas fotoexpuestas crónicas.',
                    '5%'
                  ],
                  [
                    'Melanoma lentiginoso acral',
                    'Aparece en palmas, plantas y debajo de las uñas.',
                    '10%'
                  ],
                ].map(([title, desc, pct]) => (
                  <div
                    key={title}
                    className="flex items-start justify-between gap-5 p-5"
                  >
                    <div>
                      <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                        {title}
                      </p>

                      <p className="text-sm text-[#181c1d]/70 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <span className="font-inconsolata text-sm font-bold text-[#003C43]">
                        {pct}
                      </span>
                    </div>
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-[#003C43] rounded-xl p-6 text-[#E3FEF7]">

              <p className="font-inconsolata text-sm font-bold uppercase tracking-wide mb-3">
                Factores de riesgo principales
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#E3FEF7]/80 mt-4">

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#aaeaf5] mt-1.5 shrink-0" />
                  <p>Exposición intensa a radiación ultravioleta</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#aaeaf5] mt-1.5 shrink-0" />
                  <p>Antecedentes familiares de melanoma</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#aaeaf5] mt-1.5 shrink-0" />
                  <p>Piel clara y sensibilidad solar elevada</p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-[#aaeaf5] mt-1.5 shrink-0" />
                  <p>Presencia de múltiples nevos atípicos</p>
                </div>

              </div>

            </div>

          </div>
        </article>

        {/* ESTADISTICAS */}
        <article className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow">
          <Earth className="w-8 h-8 text-[#003C43] mb-5" />

          <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            epidemiología
          </span>

          <h2 className="font-inconsolata text-2xl font-bold text-[#003C43] mb-5">
            Estadísticas Globales
          </h2>

          <div className="flex flex-col gap-6 text-sm text-[#181c1d]/75 leading-relaxed font-noto-sans">

            <p>
              La incidencia del melanoma aumentó de manera sostenida durante
              las últimas décadas, particularmente en poblaciones de piel clara
              y regiones con elevada exposición solar.
            </p>

            <p>
              Aunque representa un porcentaje menor de los cánceres cutáneos,
              es responsable de la mayoría de las muertes por cáncer de piel
              debido a su elevada capacidad metastásica.
            </p>

            {/* DATOS OMS / IARC */}
            <div className="bg-[#f6fafa] rounded-xl p-5 border border-[rgba(0,60,67,0.05)]">

              <p className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43] mb-4">
                Datos epidemiológicos · IARC / OMS
              </p>

              <div className="flex flex-col gap-4 text-sm text-[#181c1d]/70 leading-relaxed">

                <p>
                  A nivel global, de acuerdo a la Agencia Internacional para la
                  Investigación del Cáncer (IARC), se diagnosticaron 331.722 nuevos
                  casos de melanoma en 2022.
                </p>

                <p>
                  De ese total, 20.117 casos correspondieron a Latinoamérica y más de
                  1.600 fueron registrados en Argentina.
                </p>

                <p>
                  El melanoma en Latinoamérica muestra una incidencia creciente,
                  con más de 20.000 casos anuales reportados.
                </p>

                <p>
                  Aproximadamente el 40% de los diagnósticos ocurren antes de
                  los 55 años.
                </p>

                <p>
                  Según proyecciones de la Organización Mundial de la Salud (OMS),
                  para 2025 el número de fallecimientos por melanoma podría aumentar
                  un 20%.
                </p>

              </div>

            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 gap-4">

              {[
                ['331722', 'nuevos casos globales'],
                ['20117', 'casos en latinoamérica'],
                ['1600', 'casos en argentina'],
                ['40%', 'diagnósticos antes de 55 años'],
              ].map(([n, d], index) => (
                <motion.div
                  key={d}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="bg-[#f6fafa] rounded-xl p-4 border border-[rgba(0,60,67,0.05)]"
                >

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + index * 0.1,
                    }}
                    className="font-inconsolata text-2xl font-bold text-[#003C43]"
                  >
                    {n}
                  </motion.p>

                  <p className="text-[11px] uppercase tracking-wide text-[#181c1d]/55 leading-snug">
                    {d}
                  </p>

                </motion.div>
              ))}

            </div>

            {/* GRAFICO LINEAL */}
            <div className="bg-[#f6fafa] rounded-xl p-6 border border-[rgba(0,60,67,0.05)]">

              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-inconsolata text-xs font-bold uppercase tracking-wide text-[#003C43] mb-1">
                    Incidencia global
                  </p>

                  <p className="text-sm text-[#181c1d]/60">
                    Crecimiento sostenido de melanoma invasivo
                  </p>
                </div>

                <span className="font-inconsolata text-sm font-bold text-[#003C43]">
                  +46.6%
                </span>
              </div>

              <div className="relative h-44">

                {/* lineas fondo */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="border-t border-dashed border-[#003C43]/10"
                    />
                  ))}
                </div>

                {/* SVG */}
                <svg
                  viewBox="0 0 500 180"
                  className="w-full h-full relative z-10"
                  preserveAspectRatio="none"
                >

                  <motion.path
                    d="M0 150 C 80 140, 120 120, 180 110 S 280 70, 340 65 S 430 35, 500 20"
                    fill="none"
                    stroke="#003C43"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                    }}
                  />

                  <motion.path
                    d="M0 150 C 80 140, 120 120, 180 110 S 280 70, 340 65 S 430 35, 500 20 L500 180 L0 180 Z"
                    fill="url(#grad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 1.2,
                      delay: 0.8,
                    }}
                  />

                  <defs>
                    <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#77d8ec" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#77d8ec" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                </svg>

              </div>

              <div className="flex justify-between mt-4 text-[11px] uppercase tracking-wide text-[#181c1d]/45">
                <span>2010</span>
                <span>2013</span>
                <span>2016</span>
                <span>2019</span>
                <span>2022</span>
              </div>

            </div>

            {/* TENDENCIAS */}
            <div className="border border-[rgba(0,60,67,0.06)] rounded-xl overflow-hidden">

              <div className="bg-[#003C43] px-5 py-3">
                <p className="font-inconsolata text-sm font-bold uppercase tracking-wide text-[#E3FEF7]">
                  Tendencias epidemiológicas
                </p>
              </div>

              <div className="divide-y divide-[rgba(0,60,67,0.06)]">

                {[
                  [
                    'Latinoamérica y Argentina',
                    'El melanoma en Latinoamérica muestra una incidencia creciente, con más de 20.000 casos anuales reportados. En Argentina se registran más de 1.600 nuevos casos por año.',
                  ],
                  [
                    'Australia y Nueva Zelanda',
                    'Presentan las tasas más altas del mundo por radiación UV intensa y población predominantemente caucásica.',
                  ],
                  [
                    'Europa y Norteamérica',
                    'Incremento sostenido de incidencia especialmente en adultos jóvenes y menores de 55 años.',
                  ],
                  [
                    'Mortalidad',
                    'Las proyecciones de la OMS estiman que los fallecimientos por melanoma podrían aumentar un 20% hacia 2025.',
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    className="p-5"
                  >
                    <p className="font-inconsolata font-bold text-[#003C43] mb-2">
                      {title}
                    </p>

                    <p className="text-sm text-[#181c1d]/70 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                ))}

              </div>

            </div>

            <div className="bg-[#003C43] rounded-xl p-6 text-[#E3FEF7]">

              <p className="font-inconsolata text-sm font-bold uppercase tracking-wide mb-3">
                Detección temprana
              </p>

              <p className="text-sm text-[#E3FEF7]/80 leading-relaxed">
                La supervivencia a 5 años supera el 98% cuando el melanoma es
                diagnosticado en estadio I. En enfermedad metastásica avanzada,
                el pronóstico continúa siendo considerablemente más desfavorable.
              </p>

            </div>

          </div>
        </article>
      </section>
    {/* ABCDE + AUTOEXAMEN */}
<section className="mb-16">
  <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
    {/* ABCDE */}
    <article className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow h-full">
      <Ruler className="w-8 h-8 text-[#003C43] mb-5" />

      <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
        detección temprana
      </span>

      <h2 className="font-inconsolata text-2xl font-bold text-[#003C43] mb-5">
        Regla ABCDE
      </h2>

      <p className="text-sm text-[#181c1d]/70 leading-relaxed mb-6 font-noto-sans">
        La regla ABCDE es una herramienta clínica utilizada para identificar
        lesiones sospechosas de melanoma. Permite reconocer cambios que
        requieren evaluación dermatológica temprana.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          [
            'A',
            'Asimetría',
            'Una mitad de la lesión no coincide con la otra.',
          ],
          [
            'B',
            'Bordes irregulares',
            'Los bordes son desparejos, dentados o poco definidos.',
          ],
          [
            'C',
            'Color desigual',
            'Presencia de varios tonos marrones, negros, rojizos o azulados.',
          ],
          [
            'D',
            'Diámetro > 6 mm',
            'Lesiones mayores a 6 mm deben ser evaluadas.',
          ],
          [
            'E',
            'Evolución',
            'Cambios recientes en tamaño, forma, color o síntomas.',
          ],
        ].map(([letter, title, desc]) => (
          <div
            key={letter}
            className="border border-[rgba(0,60,67,0.06)] rounded-xl p-5 bg-[#f6fafa] h-full"
          >
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-[#003C43] text-white flex items-center justify-center font-inconsolata text-sm font-bold shrink-0">
                {letter}
              </div>

              <div className="min-w-0">
                <h3 className="font-inconsolata text-base font-bold text-[#003C43] mb-1 mt-1 leading-tight">
                  {title}
                </h3>

                <p className="text-sm text-[#181c1d]/70 leading-relaxed font-noto-sans">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>

    {/* AUTOEXAMEN */}
    <article className="bg-white rounded-xl p-7 hover:shadow-[0_20px_40px_rgba(0,60,67,0.07)] transition-shadow h-full">
      <Search className="w-8 h-8 text-[#003C43] mb-5" />

      <span className="inline-block bg-[#aaeaf5] text-[#003C43] font-inconsolata text-[0.65rem] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
        autoevaluación
      </span>

      <h2 className="font-inconsolata text-2xl font-bold text-[#003C43] mb-5">
        Autoexamen de la piel
      </h2>

      <p className="text-[#181c1d]/70 leading-relaxed font-noto-sans mb-6">
        El autoexamen mensual ayuda a detectar cambios sospechosos de manera
        temprana. Se recomienda realizarlo frente a un espejo, observando toda
        la superficie corporal y prestando atención a nuevas lesiones o cambios
        en lunares existentes.
      </p>

      <div className="flex flex-col gap-4">
        {[
          [
            '1',
            'Rostro y cuero cabelludo',
            'Examinar cara, cuello, orejas y cuero cabelludo utilizando espejo de mano o ayuda externa.',
          ],
          [
            '2',
            'Tronco y extremidades',
            'Revisar brazos, torso, espalda, axilas y manos observando cambios de color, forma o tamaño.',
          ],
          [
            '3',
            'Piernas, pies y uñas',
            'Controlar piernas, plantas de los pies, uñas y espacios interdigitales donde también puede aparecer melanoma.',
          ],
        ].map(([n, title, desc]) => (
          <div
            key={title}
            className="border border-[rgba(0,60,67,0.06)] rounded-xl p-5 bg-[#f6fafa]"
          >
            <div className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-[#003C43] text-white flex items-center justify-center font-inconsolata text-sm font-bold shrink-0">
                {n}
              </div>

              <div className="min-w-0">
                <h3 className="font-inconsolata text-base font-bold text-[#003C43] mb-1 mt-1 leading-tight">
                  {title}
                </h3>

                <p className="text-sm text-[#181c1d]/70 leading-relaxed font-noto-sans">
                  {desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  </div>
</section>

{/* DIAGNÓSTICO Y ESTADIFICACIÓN */}
<section className="mb-16 bg-white rounded-2xl p-8 border border-[rgba(0,60,67,0.06)]">
  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
    <Microscope className="w-7 h-7 text-[#003C43] shrink-0" />

    <h2 className="font-inconsolata text-2xl sm:text-3xl font-bold text-[#003C43] leading-tight">
      Diagnóstico y Estadificación
    </h2>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div className="flex flex-col gap-6">
      <div className="bg-[#f6fafa] rounded-xl p-6 border border-[rgba(0,60,67,0.05)]">
        <h3 className="font-inconsolata text-lg font-bold text-[#003C43] mb-4">
          Sistema TNM · AJCC 8ª Edición
        </h3>

        <div className="flex flex-col gap-5 text-sm text-[#181c1d]/70 leading-relaxed">
          <div>
            <p className="font-inconsolata font-bold text-[#003C43] mb-2">
              T (Tumor) · Espesor de Breslow
            </p>

            <p>
              T1: &lt;1.0 mm · T2: 1.01–2.0 mm · T3: 2.01–4.0 mm · T4:
              &gt;4.0 mm
            </p>

            <p className="mt-2">
              a: sin ulceración · b: con ulceración
            </p>
          </div>

          <div>
            <p className="font-inconsolata font-bold text-[#003C43] mb-2">
              N (Nodos) · Ganglios Linfáticos
            </p>

            <p>
              N0: sin metástasis · N1: 1 nodo · N2: 2–3 nodos · N3:
              4 o más nodos
            </p>
          </div>

          <div>
            <p className="font-inconsolata font-bold text-[#003C43] mb-2">
              M (Metástasis) · Distante
            </p>

            <p>
              M0: sin metástasis · M1: metástasis a distancia
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#f6fafa] rounded-xl p-6 border border-[rgba(0,60,67,0.05)]">
        <h3 className="font-inconsolata text-lg font-bold text-[#003C43] mb-3">
          Biopsia Excisional
        </h3>

        <p className="text-sm text-[#181c1d]/70 leading-relaxed">
          Gold standard para diagnóstico. Se extirpa toda la lesión
          sospechosa con un pequeño margen de piel sana para su análisis
          histopatológico.
        </p>
      </div>
    </div>

    <div className="flex flex-col gap-4">
      {[
        ['0', 'In situ (Tis)', 'Confinado a la epidermis'],
        ['I', 'T1a–T2b, N0, M0', 'Tumor localizado'],
        ['II', 'T3a–T4b, N0, M0', 'Tumor grueso, sin ganglios'],
        ['III', 'Cualquier T, N1–N3, M0', 'Metástasis ganglionares'],
        ['IV', 'Cualquier T, cualquier N, M1', 'Metástasis a distancia'],
      ].map(([stage, title, desc]) => (
        <div
          key={stage}
          className="border border-[rgba(0,60,67,0.06)] rounded-xl p-5 bg-white"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-[#003C43] text-white flex items-center justify-center font-inconsolata font-bold shrink-0">
              {stage}
            </div>

            <div className="min-w-0">
              <h3 className="font-inconsolata text-base font-bold text-[#003C43] mb-1 leading-tight">
                {title}
              </h3>

              <p className="text-sm text-[#181c1d]/65 leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="bg-[#003C43] rounded-xl p-5 text-[#E3FEF7]">
        <p className="font-inconsolata font-bold mb-2">
          Biopsia de Ganglio Centinela
        </p>

        <p className="text-sm text-[#E3FEF7]/75 leading-relaxed">
          Indicada en melanomas T1b o superiores. Permite detectar
          diseminación microscópica hacia los ganglios linfáticos.
        </p>
      </div>
    </div>
  </div>
</section>      <section className="mb-16">

        <div className="mb-8">
          <p className="font-inconsolata text-[0.7rem] font-bold uppercase tracking-[0.12em] text-[#003C43]/55 mb-3">
            Tratamiento sistémico
          </p>

          <h2 className="font-inconsolata text-3xl font-bold text-[#003C43] mb-4">
            Inmunoterapia
          </h2>

          <p className="text-[#181c1d]/70 max-w-3xl leading-relaxed">
            La inmunoterapia revolucionó el tratamiento del melanoma avanzado mediante
            la activación del sistema inmune contra las células tumorales.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-xl p-7 border border-[rgba(0,60,67,0.06)]">

            <Tablets className="w-8 h-8 text-[#003C43] mb-5" />

            <h3 className="font-inconsolata text-xl font-bold text-[#003C43] mb-5">
              Inhibidores de PD-1
            </h3>

            <div className="flex flex-col gap-5 text-sm text-[#181c1d]/70 leading-relaxed">

              <div>
                <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                  Nivolumab (Opdivo®)
                </p>

                <p>
                  Aprobado en 2014. Utilizado tanto en monoterapia como en combinación.
                </p>
              </div>

              <div>
                <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                  Pembrolizumab (Keytruda®)
                </p>

                <p>
                  Aprobado en 2014 como primera línea de tratamiento.
                </p>
              </div>

              <div className="bg-[#f6fafa] rounded-xl p-5 border border-[rgba(0,60,67,0.05)]">
                <p className="font-inconsolata font-bold text-[#003C43] mb-2">
                  Mecanismo
                </p>

                <p>
                  Bloquean PD-1 para liberar los frenos del sistema inmune,
                  permitiendo que las células inmunológicas ataquen al melanoma.
                </p>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-xl p-7 border border-[rgba(0,60,67,0.06)]">

            <FlaskConical className="w-8 h-8 text-[#003C43] mb-5" />

            <h3 className="font-inconsolata text-xl font-bold text-[#003C43] mb-5">
              Terapias Avanzadas
            </h3>

            <div className="flex flex-col gap-5 text-sm text-[#181c1d]/70 leading-relaxed">

              <div>
                <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                  Ipilimumab (Yervoy®)
                </p>

                <p>
                  Primer inhibidor de checkpoint aprobado (2011). Actualmente usado
                  principalmente en combinación.
                </p>
              </div>

              <div>
                <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                  Relatlimab + Nivolumab
                </p>

                <p>
                  Aprobada en marzo 2022 para melanoma avanzado. Añade un nuevo
                  blanco inmunológico anti-LAG3.
                </p>
              </div>

              <div>
                <p className="font-inconsolata font-bold text-[#003C43] mb-1">
                  Formulaciones Subcutáneas (2024-2025)
                </p>

                <p>
                  Nivolumab y pembrolizumab disponibles en inyección subcutánea
                  (3-5 minutos) versus infusión intravenosa tradicional
                  (30-60 minutos).
                </p>
              </div>

            </div>
          </div>

        </div>

        <div className="mt-8 bg-[#003C43] rounded-2xl p-8 text-[#E3FEF7]">

          <h3 className="font-inconsolata text-2xl font-bold mb-5">
            Resultados CheckMate 067 · 10 años
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {[
              ['43%', 'Combinación'],
              ['37%', 'Nivolumab'],
              ['19%', 'Ipilimumab'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="bg-white/5 rounded-xl p-5 border border-white/10"
              >
                <p className="font-inconsolata text-3xl sm:text-4xl font-bold mb-2 leading-none">
                  {value}
                </p>

                <p className="text-sm text-[#E3FEF7]/75">
                  supervivencia global a 10 años · {label}
                </p>
              </div>
            ))}

          </div>
        </div>

      </section>

      <section className="mb-16 bg-white rounded-2xl p-8 border border-[rgba(0,60,67,0.06)]">

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-8">
          <Pill className="w-7 h-7 text-[#003C43] shrink-0" />

          <h2 className="font-inconsolata text-2xl sm:text-3xl font-bold text-[#003C43] leading-tight">
            Terapia Dirigida BRAF / MEK
          </h2>
        </div>

        <div className="flex flex-col gap-8">

          <div className="bg-[#f6fafa] rounded-xl p-6 border border-[rgba(0,60,67,0.05)]">
            <p className="font-inconsolata text-lg font-bold text-[#003C43] mb-3">
              Mutación BRAF
            </p>

            <p className="text-sm text-[#181c1d]/70 leading-relaxed">
              Aproximadamente el 50% de los melanomas presentan mutación en el gen
              BRAF, principalmente V600E. Este gen funciona como un “interruptor”
              celular que, al alterarse, mantiene activada la proliferación tumoral.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border border-[rgba(0,60,67,0.06)] rounded-xl p-6">
              <h3 className="font-inconsolata text-lg font-bold text-[#003C43] mb-5">
                Inhibidores BRAF
              </h3>

              <div className="flex flex-col gap-4 text-sm text-[#181c1d]/70">

                <div>
                  <p className="font-inconsolata font-bold text-[#003C43]">
                    Vemurafenib (Zelboraf®)
                  </p>

                  <p>Primera terapia dirigida aprobada en 2011.</p>
                </div>

                <div>
                  <p className="font-inconsolata font-bold text-[#003C43]">
                    Dabrafenib (Tafinlar®)
                  </p>

                  <p>Mayor selectividad y menor toxicidad.</p>
                </div>

                <div>
                  <p className="font-inconsolata font-bold text-[#003C43]">
                    Encorafenib (Braftovi®)
                  </p>

                  <p>Mayor potencia inhibidora.</p>
                </div>

              </div>
            </div>

            <div className="border border-[rgba(0,60,67,0.06)] rounded-xl p-6">
              <h3 className="font-inconsolata text-lg font-bold text-[#003C43] mb-5">
                Inhibidores MEK
              </h3>

              <div className="flex flex-col gap-4 text-sm text-[#181c1d]/70">

                <p>
                  Trametinib (Mekinist®)
                </p>

                <p>
                  Cobimetinib (Cotellic®)
                </p>

                <p>
                  Binimetinib (Mektovi®)
                </p>

                <div className="bg-[#f6fafa] rounded-lg p-4 mt-2">
                  <p>
                    MEK es una enzima que trabaja junto a BRAF. Inhibir MEK ayuda a
                    retrasar la resistencia al tratamiento.
                  </p>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PREVENCION */}
      <section className="bg-[#003C43] rounded-2xl p-10 text-[#E3FEF7] overflow-hidden relative">

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <HandHeart className="w-7 h-7" />

            <h2 className="font-inconsolata text-3xl font-bold">
              Prevención
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {[
              'Usar protector solar FPS 30+',
              'Evitar exposición entre 10 y 16 hs',
              'No utilizar camas solares',
              'Utilizar sombrero y gafas UV',
              'Control dermatológico anual',
              'Autoexamen mensual',
            ].map((item) => (
              <div
                key={item}
                className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-3"
              >
                <Sprout className="w-5 h-5 shrink-0 mt-0.5" />

                <p className="text-sm leading-relaxed text-[#E3FEF7]/80">
                  {item}
                </p>
              </div>
            ))}

          </div>
        </div>

      {/*   <span className="absolute right-8 bottom-0 font-inconsolata text-[180px] font-bold text-white/5 leading-none select-none">
     
        </span> */}
      </section>

    </div>
  );
}