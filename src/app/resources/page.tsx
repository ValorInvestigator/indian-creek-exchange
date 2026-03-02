"use client";

import Link from "next/link";
import { useState } from "react";

const resources = [
  {
    title: "Standard Lumber Patterns",
    description:
      "Reference guide for standard milling patterns and profiles used in dimensional lumber and siding.",
    file: "/pdfs/standardpatterns.pdf",
    category: "Guides",
  },
  {
    title: "Redwood & Cedar Patterns Guide",
    description:
      "Profile catalog for redwood and cedar siding, trim, and decking patterns. Useful for matching existing installations.",
    file: "/pdfs/redwoodpatterns.pdf",
    category: "Guides",
  },
  {
    title: "Paneling Basics",
    description:
      "Introduction to wood paneling installation, including T&G, shiplap, and board-and-batten techniques.",
    file: "/pdfs/panelingbasics.pdf",
    category: "Guides",
  },
  {
    title: "Natural Wood Siding Guide",
    description:
      "Comprehensive guide to selecting, installing, and maintaining natural wood siding in residential applications.",
    file: "/pdfs/naturalwoodsiding.pdf",
    category: "Guides",
  },
  {
    title: "Lumber Storage Guide",
    description:
      "How to properly store and protect lumber before and during construction to prevent warping, staining, and moisture damage.",
    file: "/pdfs/lumberstorage.pdf",
    category: "Guides",
  },
];

const projectGuides = [
  {
    title: "How to Build a Cedar Fence",
    description:
      "Illustrated step-by-step guide for building a solid cedar privacy fence, including post setting, rail installation, and picket hanging.",
    file: "/pdfs/fence-building-guide.pdf",
    source: "Simpson Strong-Tie / DIY Done Right",
  },
  {
    title: "Complete Deck Building Guide",
    description:
      "12-page illustrated guide covering deck design, footings, framing, decking installation, stairs, and railings.",
    file: "/pdfs/deck-building-guide.pdf",
    source: "Decks.com",
  },
  {
    title: "Finishing Your Cedar Deck",
    description:
      "How to clean, prep, and stain a cedar deck for long-lasting protection. Covers product selection, application techniques, and maintenance schedules.",
    file: "/pdfs/deck-finishing-guide.pdf",
    source: "Forest Products Cedar Supply",
  },
  {
    title: "Installing Cedar Siding — WRCLA Guide",
    description:
      "Industry reference from the Western Red Cedar Lumber Association covering horizontal, vertical, and shingle siding installation methods.",
    file: "/pdfs/cedar-siding-installation.pdf",
    source: "Western Red Cedar Lumber Association",
  },
  {
    title: "How to Install Cedar Siding",
    description:
      "Practical siding installation guide with details on weather barriers, flashing, nailing patterns, and corner treatments.",
    file: "/pdfs/cedar-siding-jwlumber.pdf",
    source: "JW Lumber",
  },
  {
    title: "Guide to Finishing Western Red Cedar",
    description:
      "Comprehensive finishing guide for all cedar applications — decks, siding, fences, and outdoor structures. Covers stain types, application methods, and recoat schedules.",
    file: "/pdfs/cedar-finishing-guide.pdf",
    source: "Western Red Cedar Lumber Association",
  },
  {
    title: "Cedar Care & Maintenance",
    description:
      "Care and maintenance guide for cedar shelters, pergolas, and outdoor structures. Covers cleaning, sealing, and long-term wood protection.",
    file: "/pdfs/cedar-care-guide.pdf",
    source: "Cedar Forest Products",
  },
  {
    title: "Cedar Products — Properties & Care",
    description:
      "Overview of Western Red Cedar properties, natural durability, and recommended care practices for residential and commercial applications.",
    file: "/pdfs/cedar-products-care.pdf",
    source: "Real Cedar",
  },
];

const howToGuides = [
  {
    id: "fence",
    title: "How to Build a Cedar Privacy Fence",
    steps: [
      { heading: "Check Local Codes & Call 811", detail: "Before you dig, check your HOA rules and city building codes for height limits and setback requirements. Call 811 to have underground utilities marked — this is free and required by law." },
      { heading: "Plan Your Layout", detail: "Run a mason's line between your corner points. Mark post locations every 6 to 8 feet. Account for gates (typically 36\" to 48\" wide) and make sure your fence line sits on your property — not the neighbor's." },
      { heading: "Set Your Posts", detail: "Dig holes 10\" wide and at least 1/3 the length of the post deep (24\" minimum for a 6' fence). Set posts in concrete or compacted gravel, check plumb with a level, and brace them while the concrete cures. Use cedar 4x4 or 6x6 posts." },
      { heading: "Install the Rails", detail: "Attach three horizontal 2x4 cedar rails per section — one 6\" from the top, one 6\" from the bottom, and one centered. Use structural screws (not nails) rated for outdoor use. Check level on every rail." },
      { heading: "Hang the Pickets", detail: "Start at a corner or gate post. Use a spacer jig for consistent gaps (or butt them tight for full privacy). Attach each picket with two screws per rail. Check plumb every 4–5 pickets." },
      { heading: "Add the Top Cap & Trim", detail: "A 1x6 or 2x6 cap rail across the top ties the fence together and sheds water away from the end grain. Add 1x4 trim boards over the rails for a finished look." },
      { heading: "Finish & Protect", detail: "Apply a penetrating cedar stain or oil within 2–4 weeks of installation. Rough-sawn cedar absorbs stain deeply and holds it 5–7 years. Avoid film-forming paints — they peel." },
    ],
  },
  {
    id: "deck",
    title: "How to Build a Cedar Deck",
    steps: [
      { heading: "Design & Permits", detail: "Sketch your deck layout including dimensions, stair locations, and ledger attachment points. Most decks over 30\" off the ground require a building permit. Check your local codes for footing depth, railing height, and joist spacing requirements." },
      { heading: "Set Footings & Posts", detail: "Dig footings below your local frost line (36\" in most of Eastern Oregon). Pour concrete piers or use precast deck blocks. Set 6x6 posts plumb and bolt them to the footings with post bases." },
      { heading: "Install the Beam & Ledger", detail: "Attach the ledger board to your house using lag bolts with proper flashing behind it to prevent water intrusion. Set your beam across the posts using post-to-beam connectors. This is the structural backbone — double-check everything is level." },
      { heading: "Frame the Joists", detail: "Hang joists every 16\" on center using joist hangers. Crown each joist (bow side up) before installing. Add blocking between joists at mid-span for rigidity. Use joist tape on the top edges to prevent moisture rot." },
      { heading: "Lay the Decking", detail: "Start your first board at the house and work outward. Pre-drill near board ends to prevent splitting. Leave 1/8\" gaps between boards for drainage and expansion. Use stainless steel or coated deck screws." },
      { heading: "Build Stairs & Railings", detail: "Cut stringers from 2x12 stock with a max 7-3/4\" rise and 10\" run. Railings must be 36\" high (42\" if the deck is over 30\" off the ground) with balusters spaced no more than 4\" apart." },
      { heading: "Finish & Maintain", detail: "Let new cedar weather 30–60 days before applying a penetrating stain or UV-blocking oil. Reapply every 2–3 years for a maintained look, or let it silver naturally. Clean annually with a wood-safe cleaner." },
    ],
  },
  {
    id: "siding",
    title: "How to Install Cedar Siding",
    steps: [
      { heading: "Prepare the Wall", detail: "Install house wrap or a weather-resistant barrier over your sheathing, lapping seams shingle-style (upper over lower). Add 3/4\" furring strips vertically every 16\" to create a rain screen air gap — this is critical for cedar siding longevity." },
      { heading: "Install Flashing & Trim", detail: "Flash all window and door openings with self-adhesive membrane. Install corner boards, head trim, and a starter strip at the bottom. The starter strip kicks the first course of siding out to match the angle of subsequent courses." },
      { heading: "Hang the First Course", detail: "Snap a level chalk line and install the first course of siding. For bevel siding, overlap each course by at least 1-1/4\". For shiplap, engage the ship joint fully. Always nail through only one course at a time to allow for expansion." },
      { heading: "Work Up the Wall", detail: "Use a story pole (a stick marked with your course spacing) to keep courses consistent and level. Stagger end joints by at least 24\" between adjacent courses. Back-prime all cut ends with a cedar-compatible primer." },
      { heading: "Handle Joints & Corners", detail: "Butt joints should fall over a stud and be sealed with a bead of exterior caulk behind the joint. For inside corners, use a 1x1 cedar strip. For outside corners, miter or use corner boards." },
      { heading: "Finish", detail: "Cedar siding should be finished within 2 weeks of installation. Apply a semi-transparent penetrating stain for the best balance of color and protection. Oil-based stains penetrate deeper on rough-sawn faces." },
    ],
  },
  {
    id: "cedar-care",
    title: "Cedar Wood Care & Maintenance",
    steps: [
      { heading: "Understand Cedar's Natural Properties", detail: "Cedar contains natural oils (thujaplicins) that resist rot, decay, and insect damage. It's naturally stable and doesn't warp as much as other softwoods. However, UV exposure will turn unfinished cedar silver-grey within 6–12 months." },
      { heading: "Clean Before Treating", detail: "Use a wood-safe cleaner (sodium percarbonate-based, not bleach) and a stiff brush or low-pressure washer (under 1,500 PSI). Let the wood dry completely — at least 48 hours of dry weather — before applying any finish." },
      { heading: "Choose the Right Finish", detail: "Penetrating oils and semi-transparent stains are the best choice for cedar. They soak into the wood grain, protect from UV and moisture, and won't peel or blister. Avoid film-forming finishes (solid stains, paint, polyurethane) — they trap moisture and peel." },
      { heading: "Application Tips", detail: "Apply finish to clean, dry wood. Work in the shade or on an overcast day — direct sun causes the finish to dry too fast and absorb unevenly. Apply two thin coats rather than one heavy coat. Use a brush for best penetration on rough-sawn surfaces." },
      { heading: "Maintenance Schedule", detail: "Rough-sawn cedar: re-stain every 5–7 years. Smooth (S4S) cedar: re-stain every 2–3 years. Decking and horizontal surfaces: every 1–2 years (they take the most UV and water). Clean annually regardless of finish schedule." },
      { heading: "Let It Grey (Optional)", detail: "If you prefer the weathered silver look, you can leave cedar unfinished. It will grey naturally and still resist rot for decades. Apply a UV stabilizer without color if you want to slow the greying process while keeping the wood protected." },
    ],
  },
  {
    id: "garden-bed",
    title: "How to Build a Cedar Raised Garden Bed",
    steps: [
      { heading: "Choose Your Size & Location", detail: "4' wide is ideal — you can reach the center from either side without stepping in the soil. Length is up to you (8' and 12' are common). Pick a spot with 6–8 hours of sunlight and relatively level ground." },
      { heading: "Cut Your Lumber", detail: "Use 2x6 or 2x8 cedar boards for standard beds. For a 4'x8' bed, you'll need four 8' boards and four 4' boards (two courses high). Cut 4x4 cedar into 12\" corner posts. Do not use pressure-treated lumber for food gardens." },
      { heading: "Assemble the Frame", detail: "Stand the corner posts inside the corners. Screw the side boards into the posts with 3\" exterior screws — two screws per connection. Build one course at a time, check square by measuring diagonals, then add the second course." },
      { heading: "Level & Place", detail: "Set the bed in position on level ground. If your ground slopes, dig the high side down rather than shimming the low side. For a cleaner look on grass, lay cardboard or landscape fabric under the bed to suppress weeds." },
      { heading: "Fill & Plant", detail: "Fill with a mix of topsoil (60%), compost (30%), and perlite or vermiculite (10%). Water the soil to settle it before planting. Cedar's natural rot resistance means the bed will last 10–15 years without any treatment." },
    ],
  },
  {
    id: "board-batten",
    title: "How to Install Board & Batten Siding",
    steps: [
      { heading: "Prepare the Wall", detail: "Install house wrap over sheathing. Snap vertical reference lines every 12\" (for 1x12 boards) or at your chosen board width. This vertical layout naturally sheds water, making board and batten one of the most weather-resistant siding styles." },
      { heading: "Install the Wide Boards First", detail: "Attach 1x10 or 1x12 cedar boards vertically with a single nail at the center of each board per stud crossing. Do not nail the edges — the board needs to expand and contract with moisture changes. Leave a 1/2\" gap between boards." },
      { heading: "Add the Battens", detail: "Cover each gap with a 1x3 or 1x4 cedar batten strip. Nail the batten through the gap only — not through the underlying wide boards. This allows the wide boards to move independently behind the battens." },
      { heading: "Handle Top & Bottom Details", detail: "Install a drip edge or Z-flashing at the bottom to direct water away from the foundation. At the top, tuck the siding under the soffit trim or a head flashing. Caulk the top joint to prevent water entry." },
      { heading: "Finish", detail: "Stain or oil within 2 weeks of installation. Board and batten gives a dramatic look with semi-transparent stain that lets the cedar grain show through. The rough-sawn face common on board and batten stock holds stain exceptionally well." },
    ],
  },
  {
    id: "tg-paneling",
    title: "How to Install T&G Cedar Paneling",
    steps: [
      { heading: "Acclimate the Wood", detail: "Stack your T&G cedar in the room where it will be installed for at least 48 hours. Separate layers with stickers (small spacer strips) so air circulates around every board. This prevents post-installation gaps from shrinkage." },
      { heading: "Prep the Surface", detail: "Install furring strips (1x3 or 1x4) perpendicular to your paneling direction, 16\" on center. This works over drywall, concrete, or bare studs. Use a level to shim the furring strips flush — any unevenness will telegraph through the paneling." },
      { heading: "Start with the First Board", detail: "For walls, start at the bottom or in a corner with the groove edge facing out. For ceilings, start along the most visible wall. Nail through the face of the first board (these nails will be hidden by trim later)." },
      { heading: "Blind-Nail Subsequent Boards", detail: "Angle a finish nail (or use a pneumatic nailer) through the tongue at 45 degrees. Slide the groove of the next board over the tongue and tap it snug with a scrap block. Never hammer directly on the tongue — it will split." },
      { heading: "Handle Cuts & Obstacles", detail: "Use a coping saw or jigsaw for outlet and switch box cutouts. Stagger end joints randomly across the wall for a natural look. Leave a 1/8\" expansion gap at all walls, floor, and ceiling — trim will hide it." },
      { heading: "Finish with Trim", detail: "Install baseboard, crown, or quarter-round molding to cover expansion gaps. Cedar T&G can be left natural for interior use (it smells great) or sealed with a clear matte finish to preserve the fresh color." },
    ],
  },
  {
    id: "deck-finish",
    title: "How to Stain & Finish a Cedar Deck",
    steps: [
      { heading: "Wait for New Wood to Weather", detail: "Fresh cedar contains surface oils that repel finish. Let a new deck weather 30–60 days before staining. Test readiness by sprinkling water on the surface — if it soaks in within 10 seconds, you're good to go." },
      { heading: "Clean the Deck", detail: "Sweep all debris. Apply a wood cleaner (sodium percarbonate-based) with a pump sprayer, scrub with a stiff bristle brush, and rinse with a garden hose or low-pressure washer (under 1,500 PSI). Never use chlorine bleach — it damages wood fibers." },
      { heading: "Apply a Wood Brightener (Optional)", detail: "An oxalic acid-based brightener restores the natural cedar color after cleaning and opens the wood pores for better stain absorption. Apply, wait 15 minutes, rinse, and let the deck dry for 48 hours." },
      { heading: "Choose Your Stain", detail: "Penetrating, semi-transparent oil stains work best on cedar decks. They soak into the grain, let the wood texture show, and won't peel or flake. Look for UV inhibitors and mildewcide in the formula. Avoid solid stains and deck paints — they build up and peel." },
      { heading: "Apply the Stain", detail: "Work in the shade or on an overcast day (50–80°F). Apply with a stain pad, brush, or pump sprayer followed by back-brushing. Work 2–3 boards at a time to keep a wet edge. Apply two thin coats rather than one thick one." },
      { heading: "Maintain Annually", detail: "Sweep and wash your deck each spring. Reapply stain every 1–2 years on horizontal surfaces (decking, stair treads) and every 3–5 years on vertical surfaces (railings, skirting). Rough-sawn surfaces hold stain significantly longer than smooth." },
    ],
  },
];

function GuideAccordion({ guide }: { guide: typeof howToGuides[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-charcoal text-lg pr-4">{guide.title}</h3>
        <svg
          className={`w-5 h-5 text-forest-600 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-gray-100">
          <ol className="space-y-4 mt-4">
            {guide.steps.map((step, i) => (
              <li key={step.heading} className="flex gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-forest-700 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-semibold text-charcoal text-sm">{step.heading}</h4>
                  <p className="text-gray-600 text-sm mt-1 leading-relaxed">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default function ResourcesPage() {
  const guides = resources.filter((r) => r.category === "Guides");

  return (
    <div className="bg-offwhite">
      <section className="bg-forest-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl font-bold text-white uppercase tracking-wide">
            Resources
          </h1>
          <p className="mt-4 text-forest-200 text-lg max-w-2xl">
            Product guides, spec sheets, and installation references. Download
            what you need to plan your project.
          </p>
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-2">
            Installation &amp; Reference Guides
          </h2>
          <p className="text-gray-600 mb-8">
            Pattern catalogs, siding guides, and best practices for storing and
            working with natural wood products.
          </p>
          <div className="grid gap-4">
            {guides.map((resource) => (
              <a
                key={resource.title}
                href={resource.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-offwhite rounded-lg shadow-sm hover:shadow-md p-5 flex items-start gap-4 transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-forest-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-forest-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal group-hover:text-forest-700 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {resource.description}
                  </p>
                  <span className="text-forest-600 text-xs font-semibold mt-2 inline-block uppercase tracking-wider">
                    Download PDF &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Project & How-To Guides (Industry PDFs) */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-charcoal uppercase tracking-wide mb-2">
            Project & How-To Guides
          </h2>
          <p className="text-gray-600 mb-4">
            Illustrated guides from industry sources for building fences, decks,
            installing siding, and caring for cedar. Download and print for your
            next project.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
            <p className="text-amber-800 text-sm leading-relaxed">
              <strong>Disclaimer:</strong> These guides are for general
              reference only. The builder is responsible for adhering to all
              local building codes, permit requirements, and manufacturer
              specifications. Requirements vary by jurisdiction &mdash; always
              check with your local building department before starting a
              project.
            </p>
          </div>
          <div className="grid gap-4 mb-12">
            {projectGuides.map((guide) => (
              <a
                key={guide.title}
                href={guide.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-lg shadow-sm hover:shadow-md p-5 flex items-start gap-4 transition-shadow"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-amber-50 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal group-hover:text-forest-700 transition-colors">
                    {guide.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {guide.description}
                  </p>
                  <span className="text-gray-400 text-xs mt-1 block">
                    Source: {guide.source}
                  </span>
                  <span className="text-forest-600 text-xs font-semibold mt-2 inline-block uppercase tracking-wider">
                    Download PDF &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
          <h3 className="font-[family-name:var(--font-heading)] text-xl font-bold text-charcoal uppercase tracking-wide mb-4">
            Quick Reference Guides
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Short step-by-step summaries you can reference on site. Click any
            guide to expand it.
          </p>
          <div className="space-y-3">
            {howToGuides.map((guide) => (
              <GuideAccordion key={guide.id} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-forest-700 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-bold text-white uppercase tracking-wide mb-4">
            Have Questions?
          </h2>
          <p className="text-forest-100 text-lg mb-8">
            Our team knows cedar inside and out. Call us or visit the yard in
            Elgin &mdash; we&apos;ll help you pick the right product for your
            project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Request a Quote
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-forest-800 px-8 py-3.5 rounded font-[family-name:var(--font-heading)] font-bold tracking-wider uppercase transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
