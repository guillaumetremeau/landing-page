import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import CodersrankSummary from "@codersrank/summary";
import CodersrankSkillsChart from "@codersrank/skills-chart";
import CodersrankTimeline from "@codersrank/timeline";
import CodersrankWorkExperience from "@codersrank/work-experience";
import CodersrankEducation from "@codersrank/education";

window.customElements.define("codersrank-summary", CodersrankSummary);
window.customElements.define("codersrank-skillschart", CodersrankSkillsChart);
window.customElements.define("codersrank-timeline", CodersrankTimeline);
window.customElements.define(
  "codersrank-work-experience",
  CodersrankWorkExperience
);
window.customElements.define("codersrank-education", CodersrankEducation);

hydrate(<RemixBrowser />, document);
