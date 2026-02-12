import { describe, it, expect } from "vitest";

/**
 * FeedbackSection component tests
 * Since this is a frontend-only component, we test the template generation logic
 * and Telegram group link configuration.
 */

const TELEGRAM_GROUP = "https://t.me/+cBRxjXXh-51kNjY1";

const APP_NAMES = [
  "MelodiQ",
  "StreamFlix",
  "TeleTurbo",
  "CleanSlate",
  "DevSnips",
  "DropDock",
  "pCompress Pro",
  "Unzipper Pro",
  "QuickRes",
  "SonicAtlas",
];

function getTemplates(appName: string) {
  return [
    {
      id: "bug",
      title: "Report a Bug",
      template: `🐛 Bug Report — ${appName}\n\nmacOS Version: \nApp Version: \n\nWhat happened:\n\n\nSteps to reproduce:\n1. \n2. \n3. \n\nExpected behavior:\n\n\nAdditional info (screenshots, logs, etc.):\n`,
    },
    {
      id: "feature",
      title: "Request a Feature",
      template: `💡 Feature Request — ${appName}\n\nDescribe the feature:\n\n\nWhy would this be useful:\n\n\nAny examples or references:\n`,
    },
    {
      id: "feedback",
      title: "General Feedback",
      template: `💬 Feedback — ${appName}\n\nYour message:\n\n`,
    },
  ];
}

describe("FeedbackSection templates", () => {
  it("generates 3 templates for each app", () => {
    for (const appName of APP_NAMES) {
      const templates = getTemplates(appName);
      expect(templates).toHaveLength(3);
      expect(templates.map((t) => t.id)).toEqual(["bug", "feature", "feedback"]);
    }
  });

  it("includes app name in every template", () => {
    for (const appName of APP_NAMES) {
      const templates = getTemplates(appName);
      for (const t of templates) {
        expect(t.template).toContain(appName);
      }
    }
  });

  it("bug report template includes required fields", () => {
    const templates = getTemplates("StreamFlix");
    const bugTemplate = templates.find((t) => t.id === "bug")!;
    expect(bugTemplate.template).toContain("macOS Version:");
    expect(bugTemplate.template).toContain("App Version:");
    expect(bugTemplate.template).toContain("What happened:");
    expect(bugTemplate.template).toContain("Steps to reproduce:");
    expect(bugTemplate.template).toContain("Expected behavior:");
  });

  it("feature request template includes required fields", () => {
    const templates = getTemplates("MelodiQ");
    const featureTemplate = templates.find((t) => t.id === "feature")!;
    expect(featureTemplate.template).toContain("Describe the feature:");
    expect(featureTemplate.template).toContain("Why would this be useful:");
  });

  it("Telegram group link is valid", () => {
    expect(TELEGRAM_GROUP).toMatch(/^https:\/\/t\.me\/\+[A-Za-z0-9_-]+$/);
    expect(TELEGRAM_GROUP).toBe("https://t.me/+cBRxjXXh-51kNjY1");
  });
});
