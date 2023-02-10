import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";
import CodersrankSummary from "@codersrank/summary";

window.customElements.define("codersrank-summary", CodersrankSummary);

hydrate(<RemixBrowser />, document);
