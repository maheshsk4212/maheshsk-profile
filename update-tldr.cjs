const fs = require('fs');
const path = require('path');

const projectsPath = path.join(__dirname, 'src/data/projects.json');
const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf-8'));

projectsData.forEach(p => {
    let tldr = { problem: '', solution: '', impact: '' };
    
    if (p.id === 1) { // NMB Bank
        tldr.problem = "NMB Bank needed to modernize digital banking using Oracle OBDX, but the out-of-the-box platform lacked alignment with Tanzanian ecosystems (M-Pawa) and suffered from poor UX for low-literacy users.";
        tldr.solution = "Led a constraint-first UX strategy across 12+ stakeholders in Dar es Salaam and Bengaluru, customizing OBDX for progressive disclosure and regulatory compliance.";
        tldr.impact = "<ul><li>Delivered a fully localized, WCAG-compliant platform in just <strong>4 months</strong>.</li><li>Bridged the gap between an enterprise platform and real-world African banking needs.</li></ul>";
    } else if (p.id === 4) { // AI-Driven Workflow
        tldr.problem = "Traditional UX validation processes were slow, taking weeks to move from static wireframes to stakeholder alignment, resulting in recurring feedback loops.";
        tldr.solution = "Architected a generative AI discovery workflow utilizing secure, local LLMs for research synthesis and 'vibe-coding' interactive prototypes.";
        tldr.impact = "<ul><li>Reduced design validation effort by <strong>60%</strong>.</li><li>Replaced static screen reviews with high-fidelity, <strong>1-Day Proof-of-Concept</strong> builds that accelerated C-suite sign-off.</li></ul>";
    } else if (p.id === 2) { // ADCB Bank
        tldr.problem = "ADCB's corporate banking dashboard was fragmented, making it difficult for CFOs to manage multi-account workflows, bulk approvals, and FX rates efficiently.";
        tldr.solution = "Redesigned the corporate banking experience by establishing a new design system, streamlining Maker/Checker workflows, and centralizing cash flow analytics.";
        tldr.impact = "<ul><li>Significantly improved task completion rates for <strong>bulk corporate transactions</strong>.</li><li>Enhanced operational efficiency for premium banking clients.</li></ul>";
    } else if (p.id === 3) { // UBA Bank
        tldr.problem = "UBA Bank required a unified digital banking experience across 20 African countries, facing massive challenges in localization and varied regulatory compliance.";
        tldr.solution = "Developed a scalable UI architecture and a flexible design system capable of adapting to diverse regional requirements while maintaining a cohesive pan-African brand identity.";
        tldr.impact = "<ul><li>Rolled out a standardized yet deeply localized banking interface across <strong>20 countries</strong>.</li><li>Reduced time-to-market for new regional features and unified the digital ecosystem.</li></ul>";
    }
    
    p.tldr = tldr;
});

fs.writeFileSync(projectsPath, JSON.stringify(projectsData, null, 4));
console.log('Successfully updated projects.json with TL;DRs');
