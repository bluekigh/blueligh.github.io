"use strict";
if (location.protocol === "file:" || ["localhost", "127.0.0.1", "[::1]"].includes(location.hostname)) {
  const label = document.getElementById("screen-label");
  if (label) label.hidden = false;
}
