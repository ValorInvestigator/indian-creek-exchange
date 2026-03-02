"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MaterialItem {
  name: string;
  quantity: number;
  unit: string;
  category?: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.1 }
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

function DeckEstimator() {
  const [width, setWidth] = useState(12);
  const [depth, setDepth] = useState(16);
  const [deckHeight, setDeckHeight] = useState(3);
  const [attachedToHouse, setAttachedToHouse] = useState(true);
  const [results, setResults] = useState<MaterialItem[] | null>(null);

  function calculate() {
    const sqft = width * depth;
    const wasteFactor = 1.1;
    const deckingLF = Math.ceil((sqft / 0.46) * wasteFactor);

    // Joists at 16" OC
    const joists = Math.ceil((depth / 1.33) + 1);
    const joistLF = joists * width;

    // Beam(s)
    const beamLF = depth;

    // Posts — every 8ft along beam, minimum 2
    const posts = Math.max(2, Math.ceil(depth / 8) + 1);

    // Rim board / ledger board — runs the width of the deck against the house
    const rimBoardLF = attachedToHouse ? width : width * 2;

    // Joist hangers — one per joist on each end
    const joistHangers = joists * (attachedToHouse ? 2 : 2);

    // Post-to-beam brackets (saddles/caps)
    const postBeamBrackets = posts;

    // Vapor barrier behind ledger (if attached to house)
    const vaporBarrierSF = attachedToHouse ? Math.ceil(width * 1.5) : 0;

    // Flashing — runs along top of ledger board
    const flashingLF = attachedToHouse ? width : 0;

    // Screws for decking
    const deckScrews = Math.ceil(sqft * 0.5);

    // Structural screws for joist hangers, brackets
    const structuralScrews = Math.ceil(joistHangers * 10 + postBeamBrackets * 8);

    // Concrete for post footings
    const concreteBags = posts * 2;

    const items: MaterialItem[] = [
      { name: "5/4x6 Cedar Decking", quantity: deckingLF, unit: "linear ft", category: "Lumber" },
      { name: "2x6 or 2x8 Joists (Doug Fir or IC)", quantity: joistLF, unit: "linear ft", category: "Lumber" },
      { name: "4x10 WRC Beam", quantity: beamLF, unit: "linear ft", category: "Lumber" },
      { name: "6x6 PT Posts", quantity: posts, unit: "posts", category: "Lumber" },
      { name: `2x10 or 2x12 Rim Board${attachedToHouse ? " / Ledger" : ""}`, quantity: rimBoardLF, unit: "linear ft", category: "Lumber" },
    ];

    if (attachedToHouse) {
      items.push(
        { name: "Vapor Barrier (behind ledger)", quantity: vaporBarrierSF, unit: "sq ft", category: "Waterproofing" },
        { name: "Drip-Edge Flashing (over ledger)", quantity: flashingLF, unit: "linear ft", category: "Waterproofing" },
      );
    }

    items.push(
      { name: "Joist Hangers", quantity: joistHangers, unit: "hangers", category: "Hardware" },
      { name: "Post-to-Beam Saddle Brackets", quantity: postBeamBrackets, unit: "brackets", category: "Hardware" },
      { name: "Post Base Brackets (for concrete pier)", quantity: posts, unit: "brackets", category: "Hardware" },
      { name: "Stainless Steel Deck Screws", quantity: deckScrews, unit: "screws", category: "Hardware" },
      { name: "Structural Screws / Nails (for hangers)", quantity: structuralScrews, unit: "pcs", category: "Hardware" },
      { name: "Fast-Setting Concrete (50lb bags)", quantity: concreteBags, unit: "bags", category: "Concrete" },
    );

    // Reset before animating in if recalculating
    setResults(null);
    setTimeout(() => setResults(items), 50);
  }

  const groupedResults = results
    ? Object.entries(
      results.reduce(
        (acc, item) => {
          const cat = item.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        },
        {} as Record<string, MaterialItem[]>,
      ),
    )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mb-2">
        Deck Estimator
      </h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100 bg-forest-50/50">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal mb-4">
            Deck Dimensions
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Width (parallel to house)</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="4"
                  max="60"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
                <span className="ml-3 font-semibold text-gray-500">ft</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Depth (out from house)</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="4"
                  max="60"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
                <span className="ml-3 font-semibold text-gray-500">ft</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Height off ground</label>
              <div className="flex items-center">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={deckHeight}
                  onChange={(e) => setDeckHeight(Number(e.target.value))}
                  className="w-full border-gray-300 rounded px-3 py-2 sm:px-4 sm:py-3 focus:ring-amber-500 focus:border-amber-500 bg-white"
                />
                <span className="ml-3 font-semibold text-gray-500">ft</span>
              </div>
            </div>
            <div className="flex items-center pt-2 sm:pt-8">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={attachedToHouse}
                  onChange={(e) => setAttachedToHouse(e.target.checked)}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-amber-500 bg-gray-100 border-gray-300 rounded focus:ring-amber-500 cursor-pointer"
                />
                <span className="ml-3 text-sm font-bold text-gray-700 group-hover:text-charcoal transition-colors">Attached to house (Ledger board)</span>
              </label>
            </div>
          </div>
          <button
            onClick={calculate}
            className="mt-6 sm:mt-8 w-full bg-forest-700 hover:bg-forest-800 text-white font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase py-3 sm:py-4 rounded shadow-md transition-colors"
          >
            Calculate Materials
          </button>
        </div>
        <AnimatePresence>
          {attachedToHouse && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-8 flex gap-3 items-start">
                <span className="text-amber-500 font-bold text-lg leading-none">!</span>
                <p className="text-amber-800 text-sm">
                  <strong>Pro tip:</strong> Always install vapor barrier behind the
                  ledger board and drip-edge flashing across the top before laying
                  decking. This prevents water from getting between the ledger and
                  your house &mdash; the #1 cause of deck-related rot damage.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {results && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-4 sm:p-6 md:p-8 bg-white"
            >
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal mb-4 border-b border-gray-100 pb-2">
                Estimated Material List
              </h3>
              <ul className="space-y-3">
                {results.map((item, idx) => (
                  <motion.li
                    variants={itemVariants}
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-offwhite rounded border border-gray-100"
                  >
                    <div className="mb-2 sm:mb-0">
                      <span className="font-semibold text-charcoal block md:inline">{item.name}</span>
                      {item.category && (
                        <span className="text-xs font-bold text-forest-600 uppercase tracking-wider md:ml-2 block md:inline">
                          ({item.category})
                        </span>
                      )}
                    </div>
                    <div className="text-amber-700 font-bold bg-amber-50 px-3 py-1 rounded inline-block sm:block text-right self-start sm:self-auto">
                      {item.quantity} {item.unit}
                    </div>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-forest-50 rounded text-sm text-forest-800 border border-forest-100 leading-relaxed">
                <p className="font-bold mb-2">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>This is an estimate. Always consult local building codes and a professional for final plans.</li>
                  <li>Quantities include a 10% waste factor for lumber.</li>
                  <li>Fastener counts are approximate; actual needs may vary based on installation methods.</li>
                  <li>Prices are not included and will vary by supplier and region.</li>
                </ul>
              </div>
              <div className="mt-8 text-center sm:text-left">
                <Link
                  href="/quote"
                  className="inline-block w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  Get a Quote for These Materials
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function FenceEstimator() {
  const [length, setLength] = useState(100);
  const [height, setHeight] = useState(6);
  const [style, setStyle] = useState<"privacy" | "ranch">("privacy");
  const [results, setResults] = useState<MaterialItem[] | null>(null);

  function calculate() {
    if (style === "privacy") {
      const sections = Math.ceil(length / 8);
      const posts = sections + 1;
      const railsPerSection = height >= 8 ? 3 : 2;
      const rails = sections * railsPerSection;
      const picketsPerFoot = 2;
      const pickets = Math.ceil(length * picketsPerFoot);
      const concrete = Math.ceil(posts * 1.5);

      // Hardware
      const railBrackets = rails * 2; // 2 brackets per rail (one each end)
      const postCaps = posts;

      const items = [
        { name: `4x4 WC Cedar Posts (${Math.ceil(height * 1.5 + 2)}ft for ${height}ft fence)`, quantity: posts, unit: "posts", category: "Lumber" },
        { name: "2x4 IC Cedar Rails", quantity: rails, unit: "rails", category: "Lumber" },
        { name: `5/4x6 or 1x6 IC Pickets (${height}ft)`, quantity: pickets, unit: "pickets", category: "Lumber" },
        { name: "Rail-to-Post Brackets (fence brackets)", quantity: railBrackets, unit: "brackets", category: "Hardware" },
        { name: "Post Caps", quantity: postCaps, unit: "caps", category: "Hardware" },
        { name: "Stainless Steel Fence Screws / Nails", quantity: Math.ceil(pickets * 4 + rails * 6), unit: "pcs", category: "Hardware" },
        { name: "Fast-Setting Concrete (50lb bags)", quantity: concrete, unit: "bags", category: "Concrete" },
      ];
      setResults(null); setTimeout(() => setResults(items), 50);
    } else {
      // Ranch/split rail style
      const sections = Math.ceil(length / 10);
      const posts = sections + 1;
      const railsPerSection = height >= 5 ? 3 : 2;
      const rails = sections * railsPerSection;
      const concrete = Math.ceil(posts * 1.5);

      const items = [
        { name: `6x6 Cedar Posts (${Math.ceil(height + 3)}ft)`, quantity: posts, unit: "posts", category: "Lumber" },
        { name: "2x4 or 2x6 Cedar Rails (10ft)", quantity: rails, unit: "rails", category: "Lumber" },
        { name: "Rail-to-Post Brackets / Saddle Ties", quantity: rails * 2, unit: "brackets", category: "Hardware" },
        { name: "Structural Lag Screws", quantity: rails * 4, unit: "screws", category: "Hardware" },
        { name: "Fast-Setting Concrete (50lb bags)", quantity: concrete, unit: "bags", category: "Concrete" },
      ];
      setResults(null); setTimeout(() => setResults(items), 50);
    }
  }

  const groupedResults = results
    ? Object.entries(
      results.reduce(
        (acc, item) => {
          const cat = item.category || "Other";
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(item);
          return acc;
        },
        {} as Record<string, MaterialItem[]>,
      ),
    )
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden pt-4 -mx-6 md:mx-0 md:pt-0 pb-4 md:pb-0 px-4 md:px-0">
        <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100 bg-forest-50/50">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mb-2">
            Fence Estimator
          </h2>
          <p className="text-gray-500 text-sm mb-6 sm:mb-8">
            Includes posts, rails, pickets, brackets, screws, and
            concrete. Everything you need to build it right.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Total Length (ft)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min={8}
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Fence Style
              </label>
              <select
                value={style}
                onChange={(e) =>
                  setStyle(e.target.value as "privacy" | "ranch")
                }
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm bg-white"
              >
                <option value="privacy">Privacy Fence (pickets)</option>
                <option value="ranch">Ranch / Split Rail</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Fence Height
              </label>
              <select
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full border border-gray-200 rounded-md px-4 py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm bg-white"
              >
                {style === "privacy" ? (
                  <>
                    <option value={4}>4 feet</option>
                    <option value={6}>6 feet</option>
                    <option value={8}>8 feet</option>
                  </>
                ) : (
                  <>
                    <option value={3}>3 feet (2 rail)</option>
                    <option value={4}>4 feet (2 rail)</option>
                    <option value={5}>5 feet (3 rail)</option>
                  </>
                )}
              </select>
            </div>
          </div>

        </div>

        <div className="p-4 sm:p-6 md:p-0">
          <div className="bg-forest-50 border border-forest-200 rounded-md p-4 mb-6 sm:mb-8 flex gap-3 items-start">
            <span className="text-forest-600 font-bold text-lg leading-none">!</span>
            <p className="text-forest-800 text-sm">
              <strong>Pro tip:</strong> Always use rail-to-post brackets (sometimes
              called fence ties or saddle brackets) to attach rails to posts. They
              hold the 2x4 rails securely against the post and prevent sagging over
              time &mdash; much stronger than toe-nailing.
            </p>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-forest-700 hover:bg-forest-800 text-white px-8 py-3.5 sm:py-4 rounded font-bold text-sm uppercase tracking-wider transition-all duration-200 hover:shadow-lg active:scale-95"
          >
            Calculate Materials
          </button>
        </div>
      </div>

      <AnimatePresence>
        {groupedResults && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 border-t border-gray-100 pt-8"
          >
            <div className="p-4 sm:p-6 md:p-8 bg-white mt-4 sm:mt-8">
              <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal mb-6 border-b border-gray-100 pb-2">
                Materials for {length}ft of {height}ft{" "}
                <span className="text-gray-400 font-normal ml-2 block sm:inline">
                  {style === "privacy" ? "(privacy)" : "(ranch)"} fence
                </span>
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {groupedResults.map(([category, items]) => (
                  <motion.div variants={itemVariants} key={category} className="bg-gray-50 rounded-lg p-4 sm:p-5 border border-gray-100">
                    <h4 className="text-xs font-bold text-forest-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                      {category}
                      <div className="h-px bg-forest-200 flex-grow ml-2"></div>
                    </h4>
                    <ul className="space-y-2">
                      {items.map((item) => (
                        <li
                          key={item.name}
                          className="flex flex-col sm:flex-row sm:items-center justify-between py-2 sm:py-1 text-sm group border-b border-gray-100 sm:border-none last:border-none"
                        >
                          <span className="text-charcoal group-hover:text-forest-800 transition-colors mb-2 sm:mb-0">{item.name}</span>
                          <div className="flex items-center gap-2 self-start sm:self-auto bg-white sm:bg-transparent px-2 py-1 sm:p-0 rounded border border-gray-100 sm:border-none">
                            <span className="font-bold text-forest-700 bg-white sm:px-2 rounded sm:shadow-sm sm:border sm:border-gray-100 min-w-[2rem] sm:min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <span className="text-xs text-gray-500 uppercase font-medium">{item.unit}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              <motion.div variants={itemVariants} className="mt-8 text-center sm:text-left">
                <Link
                  href="/quote"
                  className="inline-block w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-1"
                >
                  Get a Quote for These Materials
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BoardFootCalculator() {
  const [thickness, setThickness] = useState<number | "">("");
  const [width, setWidth] = useState<number | "">("");
  const [length, setLength] = useState<number | "">("");
  const [quantity, setQuantity] = useState<number>(1);
  const [price, setPrice] = useState<number | "">("");

  // Formula: (Thickness(in) * Width(in) * Length(ft) * 12) / 144  
  // Or simply: (Thickness * Width * Length) / 12 (when length is in feet)
  // For UI clarity based on user request "Thickness x Width x Length ÷ 144"
  // We'll treat Length as inches in the underlying formula display if needed, 
  // but let user input Feet since that's standard for lumber length.
  const t = Number(thickness) || 0;
  const w = Number(width) || 0;
  const l = Number(length) || 0;
  const q = Number(quantity) || 1;
  const p = Number(price) || 0;

  // (T(in) * W(in) * L(ft) * 12) / 144
  const boardFeetPerPiece = (t * w * (l * 12)) / 144;
  const totalBoardFeet = boardFeetPerPiece * q;
  const totalCost = totalBoardFeet * p;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <div className="bg-white rounded-xl shadow-md overflow-hidden pt-4 -mx-6 md:mx-0 md:pt-0 pb-4 md:pb-0 px-4 md:px-0 mt-8 mb-16">
        <div className="p-4 sm:p-6 md:p-8 border-b border-gray-100 bg-forest-50/50">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl font-bold text-charcoal uppercase tracking-wide mb-2">
            Board Foot Calculator
          </h2>
          <p className="text-gray-500 text-sm mb-6 sm:mb-8">
            Instantly calculate the volume of lumber and timbers using the industry-standard formula <span className="font-mono bg-gray-100 px-1 rounded text-xs text-gray-700">(Thickness&Prime; &times; Width&Prime; &times; Length&Prime;) &divide; 144</span>. We ask for Length in <strong>feet</strong> to save you the math!
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-6">
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-charcoal mb-2 truncate">
                Thickness (in)
              </label>
              <input
                type="number"
                value={thickness}
                onChange={(e) => setThickness(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 2"
                min={0}
                step="0.125"
                className="w-full border border-gray-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="col-span-1">
              <label className="block text-sm font-semibold text-charcoal mb-2 truncate">
                Width (in)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 6"
                min={0}
                step="0.125"
                className="w-full border border-gray-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm"
              />
            </div>
            <div className="col-span-2 sm:col-span-1 mt-2 sm:mt-0">
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Length (ft)
              </label>
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(e.target.value === "" ? "" : Number(e.target.value))}
                placeholder="e.g. 10"
                min={0}
                step="0.5"
                className="w-full border border-gray-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-gray-200 sm:border-gray-100 border-dashed sm:border-solid">
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Quantity (pieces)
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="w-full border border-gray-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-charcoal mb-2">
                Price / Bd. Ft. <span className="text-gray-400 font-normal lowercase tracking-normal">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="0.00"
                  min={0}
                  step="0.01"
                  className="w-full pl-7 border border-gray-200 rounded-md px-3 py-2 sm:px-4 sm:py-3 text-charcoal focus:ring-2 focus:ring-forest-500 focus:border-forest-500 outline-none transition-all shadow-sm bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <motion.div
            className="bg-forest-50 rounded-lg p-5 sm:p-6 border border-forest-100 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6"
          >
            <div className="flex-1">
              <p className="text-xs sm:text-sm text-forest-800 uppercase tracking-widest font-bold mb-1">Total Board Feet</p>
              <div className="text-3xl sm:text-4xl font-[family-name:var(--font-heading)] font-bold text-forest-900">
                {totalBoardFeet > 0 ? totalBoardFeet.toFixed(2) : "0.00"} <span className="text-base sm:text-lg text-forest-700 font-normal">bd ft</span>
              </div>
              {q > 1 && totalBoardFeet > 0 && (
                <p className="text-xs text-forest-600 mt-1">({boardFeetPerPiece.toFixed(2)} bd ft per piece)</p>
              )}
            </div>

            {p > 0 && (
              <>
                <div className="hidden md:block w-px h-16 bg-forest-200"></div>
                <div className="md:hidden h-px w-full bg-forest-200"></div>
                <div className="flex-1 md:text-right">
                  <p className="text-xs sm:text-sm text-forest-800 uppercase tracking-widest font-bold mb-1">Estimated Cost</p>
                  <div className="text-3xl sm:text-4xl font-[family-name:var(--font-heading)] font-bold text-amber-600">
                    ${totalCost > 0 ? totalCost.toFixed(2) : "0.00"}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function EstimatorsPage() {
  const [activeTab, setActiveTab] = useState<"deck" | "fence" | "board">("deck");

  return (
    <div className="bg-offwhite min-h-screen">
      <section className="bg-forest-800 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url('/images/yard/ICE-2.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-7xl mx-auto px-4"
        >
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
            Material Estimators
          </h1>
          <p className="mt-4 text-forest-100 text-lg md:text-xl max-w-2xl leading-relaxed">
            Real materials lists &mdash; not just lumber counts. Our estimators
            include hardware, brackets, fasteners, vapor barrier, and concrete.
          </p>
        </motion.div>
      </section>

      <section className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row bg-white rounded-lg p-1.5 shadow-sm border border-gray-200 mb-8 relative">
            <motion.div
              className={`hidden sm:block absolute top-1.5 bottom-1.5 w-[calc(33.333%-0.375rem)] bg-forest-700 rounded-md`}
              animate={{
                x: activeTab === "deck" ? 0 : activeTab === "fence" ? "100%" : "200%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {/* Mobile Active Background */}
            <motion.div
              className={`sm:hidden absolute left-1.5 right-1.5 h-[calc(33.333%-0.25rem)] bg-forest-700 rounded-md`}
              animate={{
                y: activeTab === "deck" ? 0 : activeTab === "fence" ? "100%" : "200%"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            <button
              onClick={() => setActiveTab("deck")}
              className={`flex-1 py-3.5 rounded-md font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider transition-colors relative z-10 ${activeTab === "deck" ? "text-white" : "text-gray-600 hover:text-forest-700"
                }`}
            >
              Deck Estimator
            </button>
            <button
              onClick={() => setActiveTab("fence")}
              className={`flex-1 py-3.5 rounded-md font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider transition-colors relative z-10 ${activeTab === "fence" ? "text-white" : "text-gray-600 hover:text-forest-700"
                }`}
            >
              Fence Estimator
            </button>
            <button
              onClick={() => setActiveTab("board")}
              className={`flex-1 py-3.5 rounded-md font-[family-name:var(--font-heading)] font-bold uppercase tracking-wider transition-colors relative z-10 ${activeTab === "board" ? "text-white" : "text-gray-600 hover:text-forest-700"
                }`}
            >
              Bd. Ft. Calculator
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "deck" ? <DeckEstimator /> : activeTab === "fence" ? <FenceEstimator /> : <BoardFootCalculator />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
