import TopBar from "../components/TopBar";
import Footer from "../components/Footer";
import LiveRateChip from "../components/LiveRateChip";
import TabBar from "../components/TabBar";
import { MobileSelector, MobileDropdownItem } from "../components/MobileSelector";
import CurrencyItem from "../components/CurrencyItem";
import CompareItem from "../components/CompareItem";
import FavoritesItem from "../components/FavoritesItem";
import LoggedItem from "../components/LoggedItem";
import LoggedItemMobile from "../components/LoggedItemMobile";

function Row({ label, children }) {
  return (
    <div className="row-spec">
      {children}
      <span className="specimen__label">{label}</span>
    </div>
  );
}

export default function ComponentsPage() {
  return (
    <div className="page">
      <TopBar current="components" />

      {/* ===== Page header ===== */}
      <div className="page-header">
        <span className="eyebrow">DESIGN COMPONENTS</span>
        <h1>UI building blocks for the exchange checker.</h1>
        <p>Navigation, list rows and log items — each shown across all states.</p>
      </div>

      {/* ===== Navigation ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">01 / NAVIGATION</span>
          <h2>Navigation</h2>
        </div>

        {/* Live Rates */}
        <div className="component-label">Live Rates Chip</div>
        <div className="component-card component-card--chips">
          <LiveRateChip pair="EUR/GBP" rate="0.8595" change="0.67%" direction="down" />
          <LiveRateChip pair="USD/JPY" rate="151.24" change="0.33%" direction="up" />
          <LiveRateChip pair="GBP/USD" rate="1.2645" change="0.12%" direction="up" />
        </div>

        {/* Desktop Tabs */}
        <div className="component-label">Desktop Tabs — click to switch</div>
        <div className="component-card component-card--block">
          <TabBar />
        </div>

        {/* Mobile Tabs */}
        <div className="component-label">Mobile Tabs</div>
        <div className="component-card component-card--neutral700">
          <MobileSelector label="HISTORY" />
          <MobileDropdownItem label="HISTORY" count={4} />
          <span className="specimen__label">SELECTOR (CLOSED) + DROPDOWN ITEM</span>
        </div>
      </section>

      {/* ===== Currency Item ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">02 / COMPONENTS</span>
          <h2>Currency Item</h2>
          <p>Used in the currency picker dropdown — 4 states.</p>
        </div>
        <div className="component-card component-card--grid">
          <Row label="DEFAULT">
            <CurrencyItem code="USD" name="US Dollar" state="default" />
          </Row>
          <Row label="DEFAULT">
            <CurrencyItem code="EUR" name="Euro" state="default" />
          </Row>
          <Row label="HOVER">
            <CurrencyItem code="GBP" name="British Pound" state="hover" />
          </Row>
          <Row label="SELECTED">
            <CurrencyItem code="JPY" name="Japanese Yen" state="hover" selected />
          </Row>
        </div>
      </section>

      {/* ===== Compare Item ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">02 / COMPONENTS</span>
          <h2>Compare Item</h2>
          <p>
            One currency row in the Compare tab — flag, name, converted value, favorite action.
          </p>
        </div>
        <div className="component-card component-card--col">
          <Row label="DEFAULT">
            <CompareItem code="GBP" name="British Pound" value="736.65" rate="0.7366" />
          </Row>
          <Row label="HOVER">
            <CompareItem code="EUR" name="Euro" value="853.02" rate="0.8530" state="hover" />
          </Row>
          <Row label="ACTIVE (FAVORITED)">
            <CompareItem
              code="USD"
              name="US Dollar"
              value="1,000.00"
              rate="1.0000"
              state="active"
              favorited
            />
          </Row>
        </div>
      </section>

      {/* ===== Favorites Item ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">02 / COMPONENTS</span>
          <h2>Favorites Item</h2>
          <p>Saved currency pairs — live rate with percent change.</p>
        </div>
        <div className="component-card component-card--col">
          <Row label="DEFAULT — POSITIVE CHANGE">
            <FavoritesItem base="USD" quote="EUR" rate="0.8530" change="+0.16%" direction="up" />
          </Row>
          <Row label="DEFAULT — NEGATIVE CHANGE">
            <FavoritesItem
              base="USD"
              quote="GBP"
              rate="0.7899"
              change="-0.23%"
              direction="down"
            />
          </Row>
          <Row label="HOVER">
            <FavoritesItem
              base="GBP"
              quote="JPY"
              rate="189.42"
              change="+0.44%"
              direction="up"
              state="hover"
            />
          </Row>
        </div>
      </section>

      {/* ===== Logged Item ===== */}
      <section className="section">
        <div className="section__head">
          <span className="section__index">02 / COMPONENTS</span>
          <h2>Logged Item</h2>
          <p>Conversion history row — time, pair, amounts, delete.</p>
        </div>

        {/* Desktop */}
        <div className="component-label">Desktop</div>
        <div className="component-card component-card--col16">
          <LoggedItem time="20M" base="USD" quote="EUR" from="1,000.00" to="853.02" />
          <LoggedItem time="1H" base="USD" quote="GBP" from="500.00" to="394.95" />
          <LoggedItem
            time="45M"
            base="GBP"
            quote="EUR"
            from="750.00"
            to="878.25"
            state="hover"
          />
          <span className="specimen__label">DEFAULT · HOVER (row 3)</span>
        </div>

        {/* Mobile */}
        <div className="component-label">Mobile</div>
        <div className="component-card component-card--wrap24" style={{ marginBottom: 0 }}>
          <Row label="DEFAULT">
            <LoggedItemMobile time="20M" base="USD" quote="EUR" from="1,000.00" to="853.02" />
          </Row>
        </div>
      </section>

      <Footer meta="COMPONENTS · v1.0" />
    </div>
  );
}
