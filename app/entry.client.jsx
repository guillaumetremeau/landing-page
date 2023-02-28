import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import CodersrankSummary from "@codersrank/summary";
import CodersrankSkillsChart from "@codersrank/skills-chart";

window.customElements.define("codersrank-summary", CodersrankSummary);
window.customElements.define("codersrank-skills-chart", CodersrankSkillsChart);

hydrate(<RemixBrowser />, document);
