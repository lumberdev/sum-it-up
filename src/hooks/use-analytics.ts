import { EVENT_NAMES } from "analytics/events";
import { useEffect, useState } from "react";

const useAnalytics = () => {
  const [analytics, setAnalytics] = useState<{
    track: (...args: any[]) => unknown;
    identify: (...args: any[]) => unknown;
  }>();
  useEffect(() => {
    // @ts-ignore
    if (!window.analytics) {
      console.debug("ANALYTICS NOT FOUND");
    }
    console.debug("ANALYTICS FOUND");
    const timer = setTimeout(() => {
      // @ts-ignore
      if (!analytics) setAnalytics(window.analytics);
    }, 1000);
    return () => clearTimeout(timer);
  }, [analytics]);

  function track(event: string, properties: object) {
    if (typeof analytics !== "object") return;
    analytics.track(event, properties);
  }

  function identify(userId: string, traits: object) {
    if (typeof analytics !== "object") return;
    analytics.identify(userId, traits);
  }

  function trackInputSelection(properties: { type: string }) {
    track(EVENT_NAMES.INPUT, properties);
  }

  function trackLengthSelection(properties: { length: number }) {
    track(EVENT_NAMES.LENGTH, properties);
  }

  function trackSubmit(properties: { type: string; length: string; input: string }) {
    track(EVENT_NAMES.SUBMIT, properties);
  }
  function trackShare(properties: { shareURL: string }) {
    track(EVENT_NAMES.SHARED, properties);
  }
  function trackNewSummary() {
    track(EVENT_NAMES.NEW_SUMMARY, {});
  }

  return { trackShare, trackSubmit, trackLengthSelection, trackInputSelection, trackNewSummary, track, identify };
};

export default useAnalytics;
