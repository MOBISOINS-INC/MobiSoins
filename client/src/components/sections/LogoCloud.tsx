'use client';

import { useLanguage } from '../../contexts/LanguageContext';
import { SERVICE_CATEGORIES } from '../../data/services';

/* ─── Bandeau de preuve ────────────────────────────────────────────────────
   Was: four credential rows built out of `map.bullet2`, `map.footnote`,
   `map.bullet3` and `patients.point3Title` — i.e. the exact sentences the
   Dispatch section repeats 600px further down. Restating a claim twice makes
   it weaker, not stronger, and none of it was measurable.

   Now: four hard figures directly under the hero. The first two are computed
   from the catalog so they can never drift; the last two restate credentials
   the site already holds. Sits on the recessed ground tier, which is what
   makes it read as a data band rather than the page's first section.
   ---------------------------------------------------------------------- */

export const LogoCloud = () => {
  const { t } = useLanguage();

  const totalTreatments = SERVICE_CATEGORIES.reduce(
    (n, cat) => n + cat.services.length,
    0
  );

  // `edges` is written out per cell rather than derived: a 2-col mobile /
  // 4-col desktop grid needs different dividers at each breakpoint, and
  // generating them emits conflicting border utilities whose winner depends
  // on Tailwind's output order rather than on the class string.
  const stats = [
    {
      value: String(SERVICE_CATEGORIES.length),
      label: t('proof.specialtiesLabel'),
      sub: t('proof.specialtiesSub'),
      edges: 'border-b sm:border-b-0 border-r pr-5 sm:pr-7',
    },
    {
      value: String(totalTreatments),
      label: t('proof.treatmentsLabel'),
      sub: t('proof.treatmentsSub'),
      edges: 'border-b sm:border-b-0 sm:border-r pl-5 sm:pl-7 sm:pr-7',
    },
    {
      value: t('proof.matchingValue'),
      label: t('proof.matchingLabel'),
      sub: t('proof.matchingSub'),
      edges: 'border-r pr-5 sm:pl-7 sm:pr-7',
    },
    {
      value: t('proof.certValue'),
      label: t('proof.certLabel'),
      sub: t('proof.certSub'),
      edges: 'pl-5 sm:pl-7',
    },
  ];

  return (
    /* No border-y and no flat fill: the band used to be a third tone boxed
       between two others (#031226 hero → #061729 band → #0a1f38 ground), and the
       two hairlines drew attention to both seams. It now ramps from the hero's
       exact closing colour to the ground below, so it reads as the page settling
       out of the hero rather than as a separate slab. */
    <section
      className="relative"
      style={{
        background:
          'linear-gradient(180deg, #031226 0%, var(--color-ground-deep) 38%, var(--color-ground-deep) 62%, var(--color-ground) 100%)',
      }}
    >
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map(({ value, label, sub, edges }) => (
            <div
              key={label}
              className={`ms-rule-soft flex flex-col gap-2 py-7 sm:py-9 ${edges}`}
            >
              <span className="ms-stat">{value}</span>
              <span className="ms-label">{label}</span>
              <span className="ms-meta max-w-[26ch]">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
