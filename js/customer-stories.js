/* ==========================================================================
   LAXMI EN-FAB — CUSTOMER SUCCESS STORIES & CASE STUDIES ENGINE
   Interactive Filter Tabs & Story Detail Modal Controller
   ========================================================================== */

(function () {
  'use strict';

  var STORIES_DATA = [
    {
      id: "why-satyam-buildtech-chose-laxmi",
      number: "01",
      category: "Supplier Selection",
      title: "Why We Chose Laxmi for Our AAC Plant",
      statement: "We had already operated a Chinese AAC plant. For our larger second plant, we chose Laxmi.",
      overview: "After operating a 100,000 m³/year Chinese-supplied AAC plant, we evaluated suppliers from India and China for our new 300,000 m³/year plant at Wada. We selected Laxmi for advanced technology and superior engineering. The plant has delivered 100% capacity utilisation with consistent results.",
      metrics: [
        { val: "100%", label: "Capacity Utilisation" },
        { val: "2020", label: "Installation Year" }
      ],
      customer: {
        name: "Satyam Patel",
        role: "Director · Satyam Buildtech Pvt. Ltd.",
        location: "Wada, Maharashtra · 300,000 m³/year"
      },
      visualType: "certificate",
      certificateImg: "assets/images/testimonials/satyam-certificate.jpg",
      certificatePdf: "https://laxmi-customer-success-stories.mitesh958.chatgpt.site/evidence/satyam-buildtech-certificate.pdf",
      fullStory: [
        "Our first AAC plant, with an annual capacity of 100,000 m³, was installed at Mehsana, Gujarat, by a reputed Chinese supplier. Operating this plant gave us practical experience in AAC production, maintenance and wastage.",
        "As the AAC block market grew, we decided to establish a second and significantly larger plant with an annual capacity of 300,000 m³ at Wada, Maharashtra.",
        "Before selecting the supplier, we evaluated multiple AAC plant manufacturers from both India and China. Since we already had experience operating a Chinese-supplied plant, we were able to compare suppliers from the perspective of an actual plant owner.",
        "After completing our evaluation, we selected Laxmi En-Fab Pvt. Ltd. because of its advanced technology and superior engineering solutions.",
        "The plant supplied by Laxmi has performed exceptionally well. Based on our experience of operating both plants, the Laxmi plant has performed better than our earlier Chinese plant in three important areas: Maintenance, Production, and Control of wastage.",
        "We have achieved 100% capacity utilisation with consistent production results at our Wada plant.",
        "Our experience with Laxmi has extended beyond the plant's performance. Their timely delivery and outstanding after-sales service have also been highly commendable."
      ],
      specs: [
        { label: "Project", value: "AAC Block Plant" },
        { label: "Location", value: "Wada, Maharashtra" },
        { label: "Capacity", value: "300,000 m³/year" },
        { label: "Installed", value: "2020" },
        { label: "Utilisation", value: "100%" }
      ]
    },
    {
      id: "vegad-project-to-production",
      number: "02",
      category: "Project Planning",
      categories: ["Project Planning", "Plant Expansion"],
      title: "From Project Concept to Commercial Production",
      statement: "We planned a 100 m³/day plant. Laxmi helped us build an expandable plant that now produces 700 m³/day.",
      overview: "When we approached Laxmi, we had limited knowledge of the AAC market and were planning a 100 m³/day plant at Jabalpur. After reviewing raw materials, block prices and commercial viability, Laxmi recommended an expandable 250 m³/day plant. It reached full capacity within three months and later expanded in planned stages.",
      metrics: [
        { val: "100 → 700", label: "m³/day project journey" },
        { val: "3 months", label: "to full initial capacity" }
      ],
      customer: {
        name: "Amit Vegad",
        role: "Director · Vegad AAC Products Pvt. Ltd.",
        location: "Jabalpur, Madhya Pradesh · 700 m³/day current"
      },
      visualType: "capacity-journey",
      fullStory: [
        "In 2012, we planned to set up a small AAC plant of 100 m³/day capacity at Jabalpur. We approached Laxmi En-Fab with very little prior knowledge of the machinery, process or market dynamics.",
        "Rather than just quoting the machinery we requested, Laxmi's technical team analysed our local raw material availability, fly ash cost and market size. They advised us that 100 m³/day would have higher unit fixed overheads and suggested an expandable 250 m³/day layout.",
        "With Laxmi's turnkey execution, we successfully commissioned the 250 m³/day plant and ramped up to 100% capacity within 90 days of commercial operation.",
        "As our market share expanded across central India, Laxmi engineered seamless capacity expansions in modular phases: first to 340 m³/day, then 500 m³/day, and currently running at 700 m³/day with zero downtime during expansion."
      ],
      specs: [
        { label: "Initial Capacity", value: "250 m³/day (2013)" },
        { label: "Current Capacity", value: "700 m³/day" },
        { label: "Location", value: "Jabalpur, MP" },
        { label: "Growth Stage", value: "4 Modular Expansions" }
      ]
    },
    {
      id: "cubecrete-production-performance",
      number: "03",
      category: "Production Performance",
      categories: ["Production Performance", "Plant Expansion"],
      title: "Performance Proven in Daily Production",
      statement: "16,362 m³ in one month. Only 1.74% rejection. Performance measured in daily production.",
      overview: "After achieving 100% utilisation of its initial 10,000 m³/month Laxmi plant, Cubecrete placed an expansion order and increased capacity to 500 m³/day. The expanded plant achieved its highest monthly production in July 2026 and lowest recorded rejection in November 2025.",
      metrics: [
        { val: "16,362 m³", label: "highest monthly production" },
        { val: "1.74%", label: "lowest recorded rejection" }
      ],
      customer: {
        name: "Joel Ruban Thomas",
        role: "Director · Cubecrete AAC Product Private Ltd.",
        location: "Chennai, Tamil Nadu · 500 m³/day"
      },
      visualType: "performance",
      performanceImg: "assets/images/testimonials/cubecrete-highest-production.jpeg",
      certificatePdf: "https://laxmi-customer-success-stories.mitesh958.chatgpt.site/evidence/cubecrete-certificate.pdf",
      fullStory: [
        "Cubecrete established its AAC block production facility near Chennai with Laxmi En-Fab machinery. Our primary objective was achieving the highest block strength with lowest possible process wastage.",
        "Laxmi's precision high-speed cutting line and automated tilting system enabled us to achieve consistent block dimensions and eliminate corner chipping.",
        "In July 2026, our plant achieved a record monthly production of 16,362 m³, operating at peak efficiency across shifts.",
        "Our process records documented a record low rejection rate of just 1.74% in November 2025, validating Laxmi's robust equipment build and steam distribution technology."
      ],
      specs: [
        { label: "Plant Location", value: "Chennai, Tamil Nadu" },
        { label: "Peak Monthly Output", value: "16,362 m³ (July 2026)" },
        { label: "Lowest Rejection", value: "1.74%" },
        { label: "Daily Rating", value: "500 m³/day" }
      ]
    },
    {
      id: "babji-after-sales-support",
      number: "04",
      category: "After-Sales Support",
      title: "Support Beyond Machinery Supply",
      statement: "Laxmi did more than supply our machinery—they supported us through installation and continued supporting us during operation.",
      overview: "Laxmi completed the installation of our 340 m³/day AAC plant at Neemuch seamlessly and delivered on time. Professional installation, quality machinery, minimal maintenance and responsive after-sales service support smooth operations and consistent production.",
      metrics: [
        { val: "340 m³/day", label: "installed capacity" },
        { val: "On time", label: "project delivery" }
      ],
      customer: {
        name: "Hatim Najmi",
        role: "Managing Director · Babji Industrial Pvt. Ltd.",
        location: "Neemuch, Madhya Pradesh · 340 m³/day"
      },
      visualType: "certificate",
      certificateImg: "assets/images/testimonials/babji-certificate.jpg",
      certificatePdf: "https://laxmi-customer-success-stories.mitesh958.chatgpt.site/evidence/babji-certificate.pdf",
      videoUrl: "https://youtu.be/4q9b8Q16tQ4",
      fullStory: [
        "Babji Industrial set up a 340 m³/day state-of-the-art AAC block manufacturing plant at Neemuch, MP.",
        "From the initial layout design to civil foundation execution and machinery erection, Laxmi's engineering team stationed at site ensured adherence to tight timelines.",
        "What distinguishes Laxmi is their after-sales responsiveness. Their technicians and spare parts support have maintained our uptime above 98% year after year.",
        "Whenever we required technical optimisation or operator training for new recruits, Laxmi's engineers responded promptly, making our manufacturing venture profitable and hassle-free."
      ],
      specs: [
        { label: "Location", value: "Neemuch, MP" },
        { label: "Capacity", value: "340 m³/day" },
        { label: "Service Rating", value: "Consistent On-Site Support" },
        { label: "Delivery", value: "Turnkey On-Schedule" }
      ]
    },
    {
      id: "bs-concrete-repeat-order",
      number: "05",
      category: "Repeat Orders",
      categories: ["Repeat Orders", "Plant Expansion"],
      title: "Expanding Through a Repeat Order",
      statement: "Our experience with Laxmi’s 300 m³/day plant gave us the confidence to select them again for another 500 m³/day project.",
      overview: "Laxmi’s machinery quality, technical support, timely assistance and professional execution contributed to the first 300 m³/day project. That direct experience led BS Concrete to finalise a second, larger 500 m³/day AAC plant project with Laxmi.",
      metrics: [
        { val: "300 → 500", label: "m³/day repeat project progression" },
        { val: "+67%", label: "larger second project" }
      ],
      customer: {
        name: "Authorised Signatory",
        role: "Customer Representative · BS Concrete LLP",
        location: "Tezpur, Assam · 300 + 500 m³/day projects"
      },
      visualType: "repeat",
      certificateImg: "assets/images/testimonials/bs-concrete-certificate.jpeg",
      certificatePdf: "https://laxmi-customer-success-stories.mitesh958.chatgpt.site/evidence/bs-concrete-certificate.jpeg",
      fullStory: [
        "BS Concrete LLP pioneered AAC block manufacturing in the North East region with a 300 m³/day plant in Tezpur, Assam.",
        "Given the remote geographic location, reliable equipment that requires low maintenance and robust local service commitment was critical.",
        "After successfully operating the first plant at full capacity, we had zero hesitation in selecting Laxmi En-Fab again for our second project—a larger 500 m³/day plant.",
        "Repeat orders are the ultimate proof of customer satisfaction, and Laxmi has proven to be our trusted long-term engineering partner."
      ],
      specs: [
        { label: "Location", value: "Tezpur, Assam" },
        { label: "Phase 1 Plant", value: "300 m³/day" },
        { label: "Phase 2 Repeat", value: "500 m³/day" },
        { label: "Scope", value: "Turnkey Plant Engineering" }
      ]
    },
    {
      id: "blocatom-right-automation-real-plant-conditions",
      number: "06",
      category: "Plant Automation",
      title: "The Right Automation for Real Plant Conditions",
      statement: "For a 700 m³/day plant expandable to 1,500 m³/day, automation was an operational necessity—not an optional feature.",
      overview: "Blocatom selected Laxmi to execute its complete AAC plant on a turnkey basis. After installation and commissioning, Laxmi worked closely with the operating team and brought all major plant operations into coordinated automatic operation within approximately two months.",
      metrics: [
        { val: "2 months", label: "major operations automated" },
        { val: "1,500 m³/day", label: "planned expandable capacity" }
      ],
      customer: {
        name: "Bansi Patel",
        role: "Director · Blocatom Industries Private Limited",
        location: "India · 700 m³/day · expandable to 1,500 m³/day"
      },
      visualType: "automation",
      fullStory: [
        "Operating a high-capacity AAC plant of 700 m³/day requires synchronous automation across batching, pouring, tilting, wire-cutting, autoclave loading and de-moulding.",
        "Laxmi implemented an integrated PLC SCADA control architecture that connects all 8 machinery sections into one seamless, centralised control room.",
        "Within 60 days of commissioning, our complete plant was running in coordinated automatic mode, reducing manpower dependency and eliminating operator timing variations.",
        "The plant is designed to scale up to 1,500 m³/day by adding additional autoclaves without disrupting running lines."
      ],
      specs: [
        { label: "Current Capacity", value: "700 m³/day" },
        { label: "Expandable To", value: "1,500 m³/day" },
        { label: "Automation Level", value: "Fully Automated PLC-SCADA" },
        { label: "Commissioning", value: "Completed in 60 Days" }
      ]
    },
    {
      id: "rksj-relationship-after-commissioning",
      number: "07",
      category: "After-Sales Support",
      categories: ["After-Sales Support", "Supplier Selection"],
      title: "A Relationship That Continues After Commissioning",
      statement: "We selected Laxmi because we wanted dependable service after commissioning—not only quality machinery at the time of purchase.",
      overview: "Before establishing a 500 m³/day plant at Dhule, RKSJ evaluated manufacturers from India and China. A relative with direct experience operating a Chinese AAC plant recommended Laxmi particularly for its accessibility, service and continued technical support.",
      metrics: [
        { val: "500 m³/day", label: "installed plant capacity" },
        { val: "India + China", label: "supplier evaluation" }
      ],
      customer: {
        name: "Kishor Jain",
        role: "Director · RKSJ Block LLP",
        location: "Dhule, Maharashtra · 500 m³/day"
      },
      visualType: "relationship",
      fullStory: [
        "When planning our 500 m³/day plant in Dhule, Maharashtra, we conducted exhaustive due diligence on both domestic and imported machinery suppliers.",
        "Our peer network highlighted the recurring challenges of spare parts availability, language barriers and delayed technical service with imported plants.",
        "Laxmi's domestic manufacturing base in Ahmedabad, combined with over 55+ operational plant track records, provided immediate confidence.",
        "Since commissioning, Laxmi's ongoing technical visits and process reviews have helped us consistently maintain optimum raw material mix ratios and lower unit production costs."
      ],
      specs: [
        { label: "Location", value: "Dhule, Maharashtra" },
        { label: "Capacity", value: "500 m³/day" },
        { label: "Evaluation", value: "Direct Multi-Supplier Comparison" },
        { label: "Support Model", value: "Long-Term Technical Collaboration" }
      ]
    },
    {
      id: "infinity-engineering-in-every-aac-block",
      number: "08",
      category: "Block Quality",
      title: "Engineering That Reflects in Every AAC Block",
      statement: "Laxmi supplied more than a 340 m³/day plant—they gave us a disciplined process for maintaining block quality from day one.",
      overview: "After installing Infinity’s AAC plant at Kheda, Laxmi provided detailed quality-control and preventive-maintenance SOPs for different production conditions. The team has followed these parameters since the first day of production to maintain consistent block quality.",
      metrics: [
        { val: "Day 1", label: "SOP discipline began" },
        { val: "340 m³/day", label: "installed capacity" }
      ],
      customer: {
        name: "Mayur Bhungani",
        role: "Director · Infinity Block Industries Pvt. Ltd.",
        location: "Kheda, Gujarat · 340 m³/day"
      },
      visualType: "quality",
      fullStory: [
        "In the competitive AAC block market, brand reputation is made or broken by block quality—sharp edges, zero internal cracks, and consistent dry density.",
        "Laxmi provided comprehensive standard operating procedures (SOPs) for slurry viscosity, aluminium powder dispersion, pre-curing temperature control and autoclave steam curing cycles.",
        "By strictly implementing Laxmi's SOPs from Day 1, Infinity AAC blocks consistently pass IS 2185 (Part 3) standard testing with superior compressive strength.",
        "Our plant has maintained a market premium due to the unblemished surface finish and dimensional accuracy produced by Laxmi's cutting system."
      ],
      specs: [
        { label: "Location", value: "Kheda, Gujarat" },
        { label: "Capacity", value: "340 m³/day" },
        { label: "Standard", value: "IS 2185 Part 3 Compliant" },
        { label: "Focus", value: "Zero-Crack & Precision Edges" }
      ]
    },
    {
      id: "ekobloc-improving-steam-efficiency",
      number: "09",
      category: "Energy Efficiency",
      title: "Improving Steam Efficiency Across the AAC Process",
      statement: "At this 1,100 m³/day plant, energy efficiency was engineered into the complete process—not treated as a later improvement.",
      overview: "During a technical review of the NA Ekobloc plant, AAC consultant Mr. Shivashankaran verified average steam consumption of approximately 110 kg/m³ and about 5 kg of steam generated per kg of imported coal with approximately 5,500 kcal/kg calorific value.",
      metrics: [
        { val: "110 kg/m³", label: "average steam consumption" },
        { val: "5 kg", label: "steam per kg of coal" }
      ],
      customer: {
        name: "Mr. Shivashankaran",
        role: "AAC Technical Consultant · 20+ years’ experience · Independent technical assessment of NA Ekobloc Pvt. Ltd.",
        location: "Near Ahmedabad, Gujarat · 1,100 m³/day"
      },
      visualType: "energy",
      fullStory: [
        "Energy accounts for up to 30% of total AAC block operating cost. In a massive 1,100 m³/day mega-plant, every kilogram of steam saved translates into substantial annual EBITDA gains.",
        "Laxmi engineered an intelligent multi-autoclave steam transfer and condensate heat recovery system at NA Ekobloc.",
        "During independent technical verification by veteran AAC consultant Mr. Shivashankaran, the plant recorded an average steam consumption of just 110 kg/m³—well below the industry average of 140–160 kg/m³.",
        "This verified steam efficiency delivers annual fuel savings of over ₹45+ Lakhs while reducing carbon footprint."
      ],
      specs: [
        { label: "Capacity", value: "1,100 m³/day Mega Plant" },
        { label: "Steam Consumption", value: "110 kg/m³ Verified" },
        { label: "Steam Yield", value: "5 kg steam / kg coal" },
        { label: "Verifier", value: "Independent AAC Consultant" }
      ]
    },
    {
      id: "gd-aac-confidence-first-time-investor",
      number: "10",
      category: "First-Time Investor",
      categories: ["First-Time Investor", "Plant Expansion"],
      title: "Confidence for a First-Time AAC Investor",
      statement: "We entered AAC manufacturing without previous manufacturing experience. Laxmi helped us establish the people, processes and production system.",
      overview: "With backgrounds in newspaper printing and catering, GD AAC Blocks entered manufacturing for the first time with a 170 m³/day plant at Nanded. Laxmi supported team formation, manufacturing-process setup and initial production, allowing the customer to concentrate on market development.",
      metrics: [
        { val: "170 → 340", label: "m³/day capacity growth" },
        { val: "100%", label: "capacity increase" }
      ],
      customer: {
        name: "Tejas Biyani",
        role: "Director · GD AAC Blocks Pvt. Ltd.",
        location: "Nanded, Maharashtra · 170 to 340 m³/day"
      },
      visualType: "firsttime",
      fullStory: [
        "Coming from non-engineering commercial backgrounds, entering heavy industrial manufacturing was a major decision for our family.",
        "Laxmi acted not merely as a machine vendor, but as a complete project mentor. They trained our local operators, set up the chemistry lab, and guided raw material batch testing.",
        "Within the first year, our 170 m³/day plant operated at full capacity with high customer acceptance across Maharashtra.",
        "Buoyed by this operational success, we expanded the plant to 340 m³/day with Laxmi, achieving double the production with the same core operating team."
      ],
      specs: [
        { label: "Location", value: "Nanded, Maharashtra" },
        { label: "Initial Capacity", value: "170 m³/day" },
        { label: "Expanded Capacity", value: "340 m³/day" },
        { label: "Investor Background", value: "First-Time Industrialists" }
      ]
    }
  ];

  // Render Story Visual Card
  function renderVisual(story) {
    if (story.visualType === "certificate") {
      return '<div class="story-visual">' +
        '<a href="' + (story.certificatePdf || story.certificateImg) + '" target="_blank" rel="noopener noreferrer" class="certificate-frame">' +
        '<img src="' + story.certificateImg + '" alt="' + story.customer.name + ' certificate" loading="lazy" />' +
        '<span>Open signed evidence ↗</span>' +
        '</a>' +
        '</div>';
    }

    if (story.visualType === "capacity-journey") {
      return '<div class="story-visual">' +
        '<div class="capacity-journey">' +
        '<p>Designed to expand</p>' +
        '<div class="step step-0"><strong>100</strong><small>m³/day</small></div>' +
        '<div class="step step-1"><strong>250</strong><small>m³/day</small></div>' +
        '<div class="step step-2"><strong>340</strong><small>m³/day</small></div>' +
        '<div class="step step-3"><strong>500</strong><small>m³/day</small></div>' +
        '<div class="step step-4"><strong>700</strong><small>m³/day</small></div>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "performance") {
      return '<div class="story-visual">' +
        '<div class="performance-visual">' +
        '<img src="' + story.performanceImg + '" alt="Performance records" loading="lazy" />' +
        '<div class="performance-number">' +
        '<strong>16,362</strong>' +
        '<span>m³ · July 2026</span>' +
        '</div>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "repeat") {
      return '<div class="story-visual">' +
        '<div class="repeat-visual">' +
        '<div><small>First project</small><strong>300</strong><span>m³/day</span></div>' +
        '<i>→</i>' +
        '<div><small>Repeat project</small><strong>500</strong><span>m³/day</span></div>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "automation") {
      return '<div class="story-visual">' +
        '<div class="system-visual automation-visual">' +
        '<p>Integrated automatic operation</p>' +
        '<div><span>01</span><strong>Batching</strong><i>Connected</i></div>' +
        '<div><span>02</span><strong>Casting</strong><i>Connected</i></div>' +
        '<div><span>03</span><strong>Cutting</strong><i>Connected</i></div>' +
        '<div><span>04</span><strong>Autoclaving</strong><i>Connected</i></div>' +
        '<footer><b>700</b><span>m³/day now</span><em>→</em><b>1,500</b><span>m³/day planned</span></footer>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "relationship") {
      return '<div class="story-visual">' +
        '<div class="system-visual relationship-visual">' +
        '<p>Commissioning was not the end.</p>' +
        '<div class="relationship-line">' +
        '<span>Plant supplied</span><span>Commissioned</span><span>Operating</span><span>Supported</span>' +
        '</div>' +
        '<strong>500 <small>m³/day</small></strong>' +
        '<em>Continued engineering relationship</em>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "quality") {
      return '<div class="story-visual">' +
        '<div class="system-visual quality-visual">' +
        '<p>Process discipline</p>' +
        '<div class="quality-blocks"><i></i><i></i><i></i><i></i><i></i><i></i></div>' +
        '<strong>Day 1 → Today</strong>' +
        '<span>Quality SOPs · Preventive maintenance · Consistent parameters</span>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "energy") {
      return '<div class="story-visual">' +
        '<div class="system-visual energy-visual">' +
        '<p>Verified steam performance</p>' +
        '<div><strong>110</strong><span>kg steam / m³</span></div>' +
        '<div><strong>5</strong><span>kg steam / kg coal</span></div>' +
        '<footer><span>Steam transfer</span><span>Waste-heat recovery</span><span>Condensate recovery</span></footer>' +
        '</div>' +
        '</div>';
    }

    if (story.visualType === "firsttime") {
      return '<div class="story-visual">' +
        '<div class="system-visual firsttime-visual">' +
        '<p>First manufacturing venture</p>' +
        '<div><span>Start</span><strong>170</strong><small>m³/day</small></div>' +
        '<i>→</i>' +
        '<div><span>Current</span><strong>340</strong><small>m³/day</small></div>' +
        '<footer>People · Process · Production system</footer>' +
        '</div>' +
        '</div>';
    }

    return '';
  }

  // Render Story List HTML
  function renderStoryList() {
    var container = document.getElementById('stories-container');
    if (!container) return;

    var html = '';
    STORIES_DATA.forEach(function (story) {
      var extraClasses = story.visualType === 'performance' ? 'story-performance' : '';
      var cats = story.categories ? story.categories.join(',') : story.category;

      html += '<article class="story-card ' + extraClasses + '" data-id="' + story.id + '" data-category="' + cats + '">' +
        '<div class="story-inner stories-shell">' +
        renderVisual(story) +
        '<div class="story-copy">' +
        '<div class="story-kicker"><span>' + story.number + '</span><span>' + story.category + '</span></div>' +
        '<h3>' + story.title + '</h3>' +
        '<p class="story-statement">' + story.statement + '</p>' +
        '<p class="story-overview">' + story.overview + '</p>' +
        '<div class="story-metrics">' +
        '<div><strong>' + story.metrics[0].val + '</strong><span>' + story.metrics[0].label + '</span></div>' +
        '<div><strong>' + story.metrics[1].val + '</strong><span>' + story.metrics[1].label + '</span></div>' +
        '</div>' +
        '<div class="story-customer">' +
        '<strong>' + story.customer.name + '</strong>' +
        '<span>' + story.customer.role + '</span>' +
        '<span>' + story.customer.location + '</span>' +
        '</div>' +
        '<div class="story-actions">' +
        '<button type="button" class="cs-btn cs-btn-dark btn-open-story" data-story-id="' + story.id + '">Read Full Story <span>→</span></button>' +
        (story.certificatePdf ? '<a href="' + story.certificatePdf + '" target="_blank" rel="noopener noreferrer" class="cs-link-dark">View Customer Certificate ↗</a>' : '') +
        (story.videoUrl ? '<a href="' + story.videoUrl + '" target="_blank" rel="noopener noreferrer" class="cs-link-dark" style="color: #0284c7;">Watch Customer Video ▶</a>' : '') +
        '</div>' +
        '</div>' +
        '</div>' +
        '</article>';
    });

    container.innerHTML = html;
  }

  // Filter Handler
  function initFilters() {
    var buttons = document.querySelectorAll('.stories-filters button');
    var resultCount = document.getElementById('stories-result-count');

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('is-active'); });
        this.classList.add('is-active');

        var filter = this.getAttribute('data-filter');
        var cards = document.querySelectorAll('.story-card');
        var visibleCount = 0;

        cards.forEach(function (card) {
          var cardCats = card.getAttribute('data-category') || '';
          if (filter === 'all' || cardCats.indexOf(filter) !== -1) {
            card.classList.remove('is-hidden');
            visibleCount++;
          } else {
            card.classList.add('is-hidden');
          }
        });

        if (resultCount) {
          resultCount.textContent = visibleCount + ' verified customer ' + (visibleCount === 1 ? 'story' : 'stories');
        }
      });
    });
  }

  // Modal Dialog Controller
  function initModal() {
    var modalOverlay = document.getElementById('story-modal-overlay');
    var modalTitle = document.getElementById('modal-story-title');
    var modalCustomer = document.getElementById('modal-story-customer');
    var modalQuote = document.getElementById('modal-story-quote');
    var modalParagraphs = document.getElementById('modal-story-paragraphs');
    var modalSpecs = document.getElementById('modal-story-specs');
    var btnClose = document.getElementById('btn-close-story-modal');

    function openStory(storyId) {
      var story = STORIES_DATA.find(function (s) { return s.id === storyId; });
      if (!story || !modalOverlay) return;

      modalTitle.textContent = story.title;
      modalCustomer.textContent = story.customer.name + ' · ' + story.customer.role + ' · ' + story.customer.location;
      modalQuote.textContent = '"' + story.statement + '"';

      var pHTML = '';
      story.fullStory.forEach(function (p) {
        pHTML += '<p>' + p + '</p>';
      });
      modalParagraphs.innerHTML = pHTML;

      var sHTML = '';
      story.specs.forEach(function (spec) {
        sHTML += '<div><span>' + spec.label + '</span><strong>' + spec.value + '</strong></div>';
      });
      modalSpecs.innerHTML = sHTML;

      modalOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      if (!modalOverlay) return;
      modalOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }

    document.addEventListener('click', function (e) {
      var target = e.target.closest('.btn-open-story');
      if (target) {
        var id = target.getAttribute('data-story-id');
        openStory(id);
      }
    });

    if (btnClose) btnClose.addEventListener('click', closeModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
      });
    }

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  // Initialize
  document.addEventListener('DOMContentLoaded', function () {
    renderStoryList();
    initFilters();
    initModal();
  });
})();
