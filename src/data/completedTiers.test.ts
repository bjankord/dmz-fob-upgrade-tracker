import { describe, expect, it } from "vite-plus/test";
import { parseCompleted, tierKey } from "./completedTiers.ts";

describe("tierKey", () => {
  it("joins the track id and tier label", () => {
    expect(tierKey("bank", "XII")).toBe("bank:XII");
  });
});

describe("parseCompleted", () => {
  it("reads a stored list of tier ids", () => {
    expect(parseCompleted('["bank:I","gunsmith:II"]')).toEqual(["bank:I", "gunsmith:II"]);
  });

  it.each([null, "", "not json", '{"bank:I":true}', "42"])("returns [] for %j", (raw) => {
    expect(parseCompleted(raw)).toEqual([]);
  });

  it("drops entries that are not strings", () => {
    expect(parseCompleted('["bank:I", 3, null]')).toEqual(["bank:I"]);
  });
});
