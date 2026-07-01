import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import LogConversionButton from "../components/LogConversionButton";
import FavoriteButton from "../components/FavoriteButton";
import Tab from "../components/Tab";
import CurrencyButton from "../components/CurrencyButton";
import AmountInput from "../components/AmountInput";
import SearchInput from "../components/SearchInput";
import ClearButton from "../components/ClearButton";
import ExchangeButton from "../components/ExchangeButton";
import DeleteButton from "../components/DeleteButton";

import { neutrals, accents, typePresets, specimenText, spacings, radii } from "../data";

function Specimen({ label, children }) {
  return (
    <div className="specimen">
      {children}
      <span className="specimen__label">{label}</span>
    </div>
  );
}

function Swatch({ c }) {
  return (
    <div className="swatch">
      <div className="swatch__chip" style={{ background: c.hex }} />
      <span className="swatch__name">{c.name}</span>
      <div className="swatch__values">
        <div className="swatch__row">
          <span className="swatch__key">RGB</span>
          <span className="swatch__val">{c.rgb}</span>
        </div>
        <div className="swatch__row">
          <span className="swatch__key">HSL</span>
          <span className="swatch__val">{c.hsl}</span>
        </div>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="page">
      <TopBar current="design" />

      {/* ===== Page header ===== */}
      <div className="page-header">
        <span className="eyebrow">FOREIGN EXCHANGE CHECKER</span>
        <h1>A dark-mode toolkit for reading the world's currencies.</h1>
        <p>
          Foundations and components powering FX_CHECKER — built on JetBrains Mono, a deep
          neutral ramp, and a single electric lime accent.
        </p>
      </div>

      {/* ===== Color ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">01 / FOUNDATIONS</span>
          <h2>Color</h2>
        </div>

        <h3 className="subhead">Neutral</h3>
        <div className="divider" />
        <div className="swatch-grid">
          {neutrals.map((c) => (
            <Swatch key={c.name} c={c} />
          ))}
        </div>

        <h3 className="subhead">Accent</h3>
        <div className="divider" />
        <div className="swatch-grid" style={{ marginBottom: 0 }}>
          {accents.map((c) => (
            <Swatch key={c.name} c={c} />
          ))}
        </div>
      </section>

      {/* ===== Typography ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">01 / FOUNDATIONS</span>
          <h2>Typography</h2>
          <p>
            JetBrains Mono carries the entire interface — from 40px hero figures down to 10px
            labels.
          </p>
        </div>
        <div className="type-list">
          {typePresets.map((t) => (
            <div className="type-row" key={t.name}>
              <div className="type-row__meta">
                <span className="type-row__name">{t.name}</span>
                <span className="type-row__detail">{t.detail}</span>
              </div>
              <span className={`type-row__sample ${t.cls}`}>{specimenText}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Spacing ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">01 / FOUNDATIONS</span>
          <h2>Spacing</h2>
        </div>
        <div className="scale-head">
          <span className="scale-head__token">TOKEN</span>
          <span className="scale-head__px">PIXELS</span>
        </div>
        {spacings.map((s) => (
          <div className="scale-row scale-row--spacing" key={s.name}>
            <span className="scale-row__token">{s.name}</span>
            <span className="scale-row__px">{s.px}</span>
            <div className="scale-bar" style={{ width: s.w }} />
          </div>
        ))}
      </section>

      {/* ===== Radius ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">01 / FOUNDATIONS</span>
          <h2>Radius</h2>
        </div>
        <div className="scale-head">
          <span className="scale-head__token">TOKEN</span>
          <span className="scale-head__px">PIXELS</span>
        </div>
        {radii.map((r) => (
          <div className="scale-row scale-row--radius" key={r.name}>
            <span className="scale-row__token">{r.name}</span>
            <span className="scale-row__px">{r.px}</span>
            <div className="radius-demo" style={{ borderTopLeftRadius: r.r }} />
          </div>
        ))}
      </section>

      {/* ===== Components ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">02 / COMPONENTS</span>
          <h2>Components</h2>
        </div>

        {/* Log Conversion Button */}
        <div className="component-label">Log Conversion Button</div>
        <div className="component-card">
          <Specimen label="DEFAULT">
            <LogConversionButton state="default" />
          </Specimen>
          <Specimen label="HOVER">
            <LogConversionButton state="hover" />
          </Specimen>
          <Specimen label="PRESSED">
            <LogConversionButton state="pressed" />
          </Specimen>
          <Specimen label="FOCUS">
            <LogConversionButton state="focus" />
          </Specimen>
          <Specimen label="DISABLED">
            <LogConversionButton state="disabled" />
          </Specimen>
        </div>

        {/* Favorite Button */}
        <div className="component-label">Favorite Button</div>
        <div className="component-card">
          <Specimen label="DEFAULT">
            <FavoriteButton state="default" />
          </Specimen>
          <Specimen label="ACTIVE">
            <FavoriteButton state="active" />
          </Specimen>
          <Specimen label="ICON ONLY">
            <FavoriteButton state="icon" />
          </Specimen>
        </div>

        {/* Tab Button */}
        <div className="component-label">Tab Button</div>
        <div className="component-card component-card--wide">
          <Specimen label="DEFAULT">
            <Tab state="default" label="HISTORY" count={4} />
          </Specimen>
          <Specimen label="ACTIVE">
            <Tab state="active" label="HISTORY" count={4} />
          </Specimen>
          <Specimen label="FOCUS">
            <Tab state="focus" label="HISTORY" count={4} />
          </Specimen>
        </div>

        {/* Currency Button */}
        <div className="component-label">Currency Button</div>
        <div className="component-card">
          <Specimen label="DEFAULT">
            <CurrencyButton state="default" code="USD" />
          </Specimen>
          <Specimen label="HOVER">
            <CurrencyButton state="hover" code="EUR" />
          </Specimen>
          <Specimen label="FOCUS">
            <CurrencyButton state="focus" code="GBP" />
          </Specimen>
        </div>

        {/* Amount Input */}
        <div className="component-label">Amount Input</div>
        <div className="component-card component-card--wide">
          <Specimen label="EMPTY">
            <AmountInput state="empty" />
          </Specimen>
          <Specimen label="FILLED">
            <AmountInput state="filled" />
          </Specimen>
          <Specimen label="HOVER">
            <AmountInput state="hover" />
          </Specimen>
          <Specimen label="FOCUSED">
            <AmountInput state="focused" />
          </Specimen>
        </div>

        {/* Search Input */}
        <div className="component-label">Search Input</div>
        <div className="component-card component-card--neutral700">
          <SearchInput state="default" />
          <SearchInput state="active" />
        </div>

        {/* Clear Button */}
        <div className="component-label">Clear Button</div>
        <div className="component-card">
          <Specimen label="DEFAULT">
            <ClearButton state="default" />
          </Specimen>
          <Specimen label="HOVER">
            <ClearButton state="hover" />
          </Specimen>
          <Specimen label="FOCUS">
            <ClearButton state="focus" />
          </Specimen>
        </div>

        {/* Exchange Button */}
        <div className="component-label">Exchange Button</div>
        <div className="component-card">
          <Specimen label="DEFAULT">
            <ExchangeButton state="default" />
          </Specimen>
          <Specimen label="HOVER">
            <ExchangeButton state="hover" />
          </Specimen>
          <Specimen label="FOCUS">
            <ExchangeButton state="focus" />
          </Specimen>
        </div>

        {/* Delete Button */}
        <div className="component-label">Delete Button</div>
        <div className="component-card" style={{ marginBottom: 0 }}>
          <Specimen label="DEFAULT">
            <DeleteButton state="default" />
          </Specimen>
          <Specimen label="HOVER">
            <DeleteButton state="hover" />
          </Specimen>
          <Specimen label="FOCUS">
            <DeleteButton state="focus" />
          </Specimen>
        </div>
      </section>

      <Footer meta="DESIGN SYSTEM · v1.0" />
    </div>
  );
}
