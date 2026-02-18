import { useState, useEffect } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  MapPin,
  Clock,
  ChevronRight,
  ExternalLink,
  Quote,
  Newspaper,
  Phone,
  Mail,
  Anchor,
  Ship,
  TreePine,
  Fish,
  Mountain,
  Bird,
  Shield,
  Users,
  Building2,
  Waves,
} from "lucide-react";

/* ── data ─────────────────────────────────────────────────────────── */

const breakingHeadlines = [
  "Alaska Marine Highway announces expanded summer ferry schedule",
  "Record rainfall in Ketchikan breaks 90-year-old record",
  "Tongass timber harvest plan draws public comment period",
  "Juneau Assembly votes on cruise ship passenger limits",
];

const articles: {
  title: string;
  category: string;
  color: string;
  summary: string;
  date: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Alaska Marine Highway Ferry Fleet Gets $120M Federal Upgrade Funding",
    category: "Transportation",
    color: "bg-blue-600",
    summary:
      "Federal infrastructure bill allocates major funding for vessel replacements and terminal improvements across the Southeast Alaska ferry system.",
    date: "June 14, 2025",
    icon: <Ship className="w-5 h-5" />,
  },
  {
    title: "Juneau's Mendenhall Glacier Retreat Accelerates, Scientists Warn",
    category: "Environment",
    color: "bg-green-600",
    summary:
      "New satellite data shows the iconic glacier has retreated more in the past decade than in the previous fifty years, raising concerns about downstream flooding.",
    date: "June 13, 2025",
    icon: <Mountain className="w-5 h-5" />,
  },
  {
    title: "Ketchikan Cruise Ship Season Brings Record 1.4 Million Visitors",
    category: "Tourism",
    color: "bg-cyan-600",
    summary:
      "The 2025 cruise season is on pace to shatter records, prompting renewed debate over infrastructure capacity and environmental impacts.",
    date: "June 12, 2025",
    icon: <Anchor className="w-5 h-5" />,
  },
  {
    title: "Sitka Sound Herring Fishery Opens with Strong Run Forecast",
    category: "Fishing",
    color: "bg-indigo-600",
    summary:
      "Biologists predict one of the largest herring returns in years, offering hope for commercial sac-roe and food-and-bait fisheries.",
    date: "June 11, 2025",
    icon: <Fish className="w-5 h-5" />,
  },
  {
    title: "Wrangell Narrows Navigation Improvements Project Moves Forward",
    category: "Maritime",
    color: "bg-slate-600",
    summary:
      "The Army Corps of Engineers greenlights dredging and channel-widening work on the critical 22-mile waterway linking Petersburg to open waters.",
    date: "June 10, 2025",
    icon: <Waves className="w-5 h-5" />,
  },
  {
    title: "Petersburg Shrimp Festival Celebrates 50th Anniversary",
    category: "Community",
    color: "bg-amber-600",
    summary:
      "Thousands gather in 'Little Norway' for the golden anniversary of one of Southeast Alaska's most beloved community festivals.",
    date: "June 9, 2025",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "Southeast Alaska Land Trust Preserves 5,000 Acres of Old-Growth",
    category: "Conservation",
    color: "bg-emerald-600",
    summary:
      "A landmark conservation easement protects pristine temperate rainforest habitat in the Tongass, safeguarding salmon streams and wildlife corridors.",
    date: "June 8, 2025",
    icon: <TreePine className="w-5 h-5" />,
  },
  {
    title: "Tlingit & Haida Central Council Announces Major Cultural Center Project",
    category: "Culture",
    color: "bg-purple-600",
    summary:
      "A $45 million cultural center and museum in Juneau will celebrate the heritage of Southeast Alaska's Indigenous peoples and serve as a hub for language revitalization.",
    date: "June 7, 2025",
    icon: <Shield className="w-5 h-5" />,
  },
];

const quotes = [
  {
    text: "To the lover of wilderness, Alaska is one of the most wonderful countries in the world.",
    author: "John Muir",
  },
  {
    text: "Alaska is what happens when Willy Wonka designs a state.",
    author: "Robin Williams",
  },
  {
    text: "The bears of Alaska inspire respect and awe — they are the true rulers of this land.",
    author: "Timothy Treadwell",
  },
  { text: "Alaska isn't just a place. It's a feeling.", author: "Local saying" },
  {
    text: "The Northern Lights are proof that even the sky can dance.",
    author: "Local saying",
  },
];

const networkSites = [
  {
    name: "Alaska Consulting Group",
    desc: "Professional Business Consulting",
    url: "https://alaskaconsultinggroup.com",
  },
  {
    name: "Alaska Metals Exchange",
    desc: "Buy & Sell Gold & Silver",
    url: "https://alaskametalsexchange.com",
  },
  {
    name: "Kenai Borough Realty",
    desc: "Find Your Alaska Dream Home",
    url: "https://kenaiboroughrealty.com",
  },
  {
    name: "Alaska Drone Survey",
    desc: "Professional Aerial Mapping",
    url: "https://alaskadronesurvey.com",
  },
  {
    name: "Alaska Minerals Exploration",
    desc: "Expert Geological Services",
    url: "https://akmineralexploration.com",
  },
  {
    name: "Alaska Listings",
    desc: "Classifieds & Marketplace",
    url: "https://aklistings.com",
  },
  {
    name: "Alaska Guide Listings",
    desc: "Find Alaska Guides & Outfitters",
    url: "https://alaskaguidelistings.com",
  },
  {
    name: "Alaska Domains",
    desc: "Premium Alaska Domain Names",
    url: "https://alaskadomains.com",
  },
];

const forecast: {
  day: string;
  high: number;
  low: number;
  icon: React.ReactNode;
  label: string;
}[] = [
  { day: "Mon", high: 54, low: 46, icon: <CloudRain className="w-6 h-6 text-blue-400" />, label: "Rain" },
  { day: "Tue", high: 52, low: 45, icon: <CloudRain className="w-6 h-6 text-blue-400" />, label: "Rain" },
  { day: "Wed", high: 55, low: 47, icon: <Cloud className="w-6 h-6 text-gray-400" />, label: "Overcast" },
  { day: "Thu", high: 53, low: 46, icon: <CloudRain className="w-6 h-6 text-blue-400" />, label: "Showers" },
  { day: "Fri", high: 56, low: 48, icon: <Cloud className="w-6 h-6 text-gray-400" />, label: "Cloudy" },
  { day: "Sat", high: 58, low: 49, icon: <Sun className="w-6 h-6 text-yellow-400" />, label: "Pt. Sun" },
  { day: "Sun", high: 55, low: 47, icon: <CloudRain className="w-6 h-6 text-blue-400" />, label: "Rain" },
];

/* ── component ────────────────────────────────────────────────────── */

const Index = () => {
  const [quoteIdx, setQuoteIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setQuoteIdx((i) => (i + 1) % quotes.length), 8000);
    return () => clearInterval(id);
  }, []);

  const tickerText = breakingHeadlines.join("  \u2022  ");

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      {/* ── CSS for ticker ─────────────────────────────────────── */}
      <style>{`
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-scroll {
          animation: ticker 40s linear infinite;
        }
        .ticker-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ═══════════════════  1 · BREAKING NEWS TICKER  ════════ */}
      <div className="bg-slate-900 border-b border-slate-800 overflow-hidden">
        <div className="flex items-center">
          <span className="shrink-0 bg-amber-500 text-black font-extrabold text-xs tracking-wider uppercase px-4 py-2">
            Breaking
          </span>
          <div className="overflow-hidden whitespace-nowrap py-2">
            <span className="ticker-scroll inline-block pl-4 text-sm text-gray-300">
              {tickerText + "  \u2022  " + tickerText}
            </span>
          </div>
        </div>
      </div>

      {/* ═══════════════════  HEADER / NAV  ════════════════════ */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TreePine className="w-8 h-8 text-emerald-400" />
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight leading-none">
                Tongass <span className="text-emerald-400">News</span>
              </h1>
              <p className="text-[11px] text-gray-500 tracking-widest uppercase">
                Southeast Alaska &amp; Tongass National Forest
              </p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-400">
            {["News", "Weather", "Fishing", "Community", "Culture", "About"].map((l) => (
              <a key={l} href="#" className="hover:text-emerald-400 transition-colors">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </div>
        </div>
      </header>

      {/* ═══════════════════  2 · HERO SECTION  ════════════════ */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-950 to-teal-950 py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-emerald-600/30 text-emerald-300 rounded-full border border-emerald-700/50">
            Featured Story
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6">
            Tongass National Forest Management Plan Sparks Debate as Old-Growth Protections Expand
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-8">
            Conservationists celebrate new safeguards for America's largest national forest while Southeast Alaska's timber industry warns of economic fallout — a decades-old tension that continues to shape the region's identity and future.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Read Full Coverage <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* ═══════════════════  3 · WEATHER SECTION  ═════════════ */}
      <section className="bg-gradient-to-br from-slate-900 to-teal-950 py-14 px-4 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Thermometer className="w-6 h-6 text-teal-400" />
            <h3 className="text-2xl font-bold">Southeast Alaska Weather</h3>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Current conditions */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
                <MapPin className="w-4 h-4" /> Juneau / Southeast Alaska
              </div>
              <div className="flex items-center gap-4 mb-6">
                <CloudRain className="w-14 h-14 text-blue-400" />
                <div>
                  <p className="text-5xl font-extrabold">52°F</p>
                  <p className="text-gray-400">Rain</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Wind className="w-4 h-4 text-teal-400" /> SE 18 mph
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Droplets className="w-4 h-4 text-blue-400" /> 89% humidity
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Cloud className="w-4 h-4 text-gray-500" /> Overcast
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Thermometer className="w-4 h-4 text-orange-400" /> Feels 48°F
                </div>
              </div>
            </div>

            {/* 7-day forecast */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <h4 className="font-semibold text-gray-300 mb-4">7-Day Forecast</h4>
              <div className="space-y-2">
                {forecast.map((d) => (
                  <div key={d.day} className="flex items-center justify-between text-sm">
                    <span className="w-10 font-medium text-gray-300">{d.day}</span>
                    {d.icon}
                    <span className="text-gray-500 w-16 text-center">{d.label}</span>
                    <span className="text-gray-300 font-medium">{d.high}°</span>
                    <span className="text-gray-500">{d.low}°</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Windy embed */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden">
              <iframe
                title="Windy weather map"
                className="w-full h-full min-h-[320px]"
                src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=in&metricTemp=°F&metricWind=mph&zoom=7&overlay=rain&product=ecmwf&level=surface&lat=57.05&lon=-135.33"
                frameBorder="0"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  4 · REGIONAL NEWS GRID  ══════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Newspaper className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold">Regional News</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {articles.map((a) => (
              <article
                key={a.title}
                className="group bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden hover:border-emerald-700/60 transition-colors"
              >
                <div className="p-5 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`${a.color} text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded`}>
                      {a.category}
                    </span>
                    <span className="text-[11px] text-gray-500">{a.date}</span>
                  </div>
                  <div className="flex items-start gap-2 mb-3">
                    <span className="text-emerald-500 mt-0.5 shrink-0">{a.icon}</span>
                    <h4 className="font-semibold text-sm leading-snug group-hover:text-emerald-400 transition-colors">
                      {a.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed flex-1">{a.summary}</p>
                  <a href="#" className="mt-4 inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 font-medium">
                    Read more <ChevronRight className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  5 · ALASKA QUOTES  ═══════════════ */}
      <section className="bg-gradient-to-r from-teal-950/60 via-slate-950 to-emerald-950/60 py-16 px-4 border-y border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <Quote className="w-10 h-10 text-emerald-600/50 mx-auto mb-6" />
          <p className="text-xl sm:text-2xl italic text-gray-300 leading-relaxed mb-4 transition-all duration-700">
            &ldquo;{quotes[quoteIdx].text}&rdquo;
          </p>
          <p className="text-sm text-emerald-400 font-medium">— {quotes[quoteIdx].author}</p>
          <div className="flex justify-center gap-2 mt-6">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => setQuoteIdx(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === quoteIdx ? "bg-emerald-400" : "bg-slate-700"
                }`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  6 · AD NETWORK  ═════════════════ */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Building2 className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-400">From Our Network</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {networkSites.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-slate-900/50 border border-slate-800 rounded-xl p-5 flex flex-col hover:border-emerald-700/50 transition-colors"
              >
                <h4 className="font-semibold text-sm mb-1 group-hover:text-emerald-400 transition-colors">{s.name}</h4>
                <p className="text-xs text-gray-500 flex-1">{s.desc}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] text-emerald-500 font-medium">
                  Visit <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  7 · REGIONAL INFO  ═══════════════ */}
      <section className="bg-gradient-to-br from-slate-900 to-teal-950 py-16 px-4 border-y border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <MapPin className="w-6 h-6 text-emerald-400" />
            <h3 className="text-2xl font-bold">Tongass Region at a Glance</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tongass NF */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="w-5 h-5 text-emerald-400" />
                <h4 className="font-semibold">Tongass National Forest</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                At 16.7 million acres, the Tongass is the largest national forest in the United States — a vast temperate rainforest stretching across Southeast Alaska's islands and coast.
              </p>
            </div>

            {/* Communities */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-teal-400" />
                <h4 className="font-semibold">SE Alaska Communities</h4>
              </div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li>Juneau (capital) — pop. ~32,000</li>
                <li>Ketchikan — pop. ~8,200</li>
                <li>Sitka — pop. ~8,500</li>
                <li>Wrangell — pop. ~2,100</li>
                <li>Petersburg — pop. ~3,200</li>
                <li>Haines — pop. ~2,500</li>
                <li>Skagway — pop. ~1,200</li>
              </ul>
            </div>

            {/* Marine Highway */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Ship className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold">Alaska Marine Highway</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The state-run ferry system connects Southeast Alaska's island communities, providing essential transportation for residents, vehicles, and freight across hundreds of miles of coastal waterways.
              </p>
            </div>

            {/* Ecosystem */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Droplets className="w-5 h-5 text-blue-400" />
                <h4 className="font-semibold">Ecosystem</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                The region is a temperate rainforest receiving over 70 inches of rainfall per year in many areas. Massive Sitka spruce, western hemlock, and red cedar dominate the canopy.
              </p>
            </div>

            {/* Wildlife */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Bird className="w-5 h-5 text-amber-400" />
                <h4 className="font-semibold">Wildlife</h4>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Home to brown bears, bald eagles, humpback whales, and all five species of Pacific salmon — king, sockeye, coho, pink, and chum.
              </p>
            </div>

            {/* Industries & Emergency */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-5 h-5 text-red-400" />
                <h4 className="font-semibold">Key Info</h4>
              </div>
              <ul className="text-sm text-gray-400 space-y-1">
                <li><strong className="text-gray-300">Industries:</strong> Government, Tourism, Fishing, Timber</li>
                <li><strong className="text-gray-300">Emergency:</strong> 911</li>
                <li><strong className="text-gray-300">Juneau Police:</strong> (907) 586-0600</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  8 · FOOTER  ══════════════════════ */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-14 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="w-6 h-6 text-emerald-400" />
                <span className="text-xl font-extrabold">
                  Tongass <span className="text-emerald-400">News</span>
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">
                Your trusted source for news and information from Southeast Alaska and the Tongass National Forest region.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-3">Navigation</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                {["Latest News", "Weather", "Fishing Reports", "Community Events", "Culture & Heritage", "About Us"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-emerald-400 transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sister Sites */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-3">Sister Sites</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><a href="https://kenainews.com" className="hover:text-emerald-400 transition-colors">Kenai News</a></li>
                <li><a href="https://chugachnews.com" className="hover:text-emerald-400 transition-colors">Chugach News</a></li>
                <li><a href="https://alcannews.com" className="hover:text-emerald-400 transition-colors">ALCAN News</a></li>
                <li><a href="https://alaskanewscorporation.com" className="hover:text-emerald-400 transition-colors">Alaska News Corporation</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm text-gray-300 mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <a href="mailto:news@tongassnews.com" className="hover:text-emerald-400 transition-colors">
                    news@tongassnews.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>(907) 555-0200</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Tongass News. All rights reserved.</p>
            <p>Part of <a href="https://alaskanewscorporation.com" className="text-emerald-600 hover:text-emerald-400 transition-colors">Alaska News Corporation</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
