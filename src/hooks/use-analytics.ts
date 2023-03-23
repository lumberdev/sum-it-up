import { EVENT_NAMES } from "analytics/events";
import { useEffect, useMemo, useRef } from "react";
import { RequestBody } from "~/types";

const useAnalytics = () => {
  const analyticsRef = useRef<{
    track: (...args: unknown[]) => unknown;
    identify: (...args: unknown[]) => unknown;
  }>();

  useEffect(() => {
    // @ts-ignore
    if (!window.analytics) {
      console.debug("ANALYTICS NOT FOUND");
    }
    console.debug("ANALYTICS FOUND");
    const timer = setTimeout(() => {
      // @ts-ignore
      if (!analyticsRef.current) analyticsRef.current = window.analytics;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const track = useMemo(() => {
    function track(event: string, properties: object) {
      const analytics = analyticsRef.current;
      if (typeof analytics !== "object") return;
      analytics.track(event, properties);
    }
    return track;
  }, []);

  const identify = useMemo(() => {
    const analytics = analyticsRef.current;
    function identify(userId: string, traits: object) {
      if (typeof analytics !== "object") return;
      analytics.identify(userId, traits);
    }
    return identify;
  }, []);

  const trackInputSelection = useMemo(() => {
    function trackInputSelection(properties: { type: string }) {
      track(EVENT_NAMES.INPUT, properties);
    }
    return trackInputSelection;
  }, [track]);

  const trackLengthSelection = useMemo(() => {
    function trackLengthSelection(properties: { length: number }) {
      track(EVENT_NAMES.LENGTH, properties);
    }
    return trackLengthSelection;
  }, [track]);
  const trackSubmit = useMemo(() => {
    function trackSubmit(properties: { type: string; length: string; input: string }) {
      track(EVENT_NAMES.SUBMIT, properties);
    }
    return trackSubmit;
  }, [track]);

  const trackShare = useMemo(() => {
    function trackShare(properties: { shareURL: string }) {
      track(EVENT_NAMES.SHARED, properties);
    }
    return trackShare;
  }, [track]);

  const trackNewSummary = useMemo(() => {
    function trackNewSummary() {
      track(EVENT_NAMES.NEW_SUMMARY, {});
    }
    return trackNewSummary;
  }, [track]);
  const trackRequestCompleted = useMemo(() => {
    function trackRequestCompleted(properties: {
      type: string;
      output: string;
      inputCharacterLength: number;
      outputCharacterLength: number;
    }) {
      track(EVENT_NAMES.REQUEST_COMPLETED, properties);
    }
    return trackRequestCompleted;
  }, [track]);
  const trackRequestError = useMemo(() => {
    function trackRequestError(properties: RequestBody & { error: string }) {
      track(EVENT_NAMES.REQUEST_ERROR, properties);
    }
    return trackRequestError;
  }, [track]);

  return {
    trackShare,
    trackSubmit,
    trackLengthSelection,
    trackInputSelection,
    trackNewSummary,
    trackRequestCompleted,
    trackRequestError,
    track,
    identify,
  };
};

export default useAnalytics;
